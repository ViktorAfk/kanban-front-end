import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo, TodoItem } from "../../types/interface";
import { RootState } from "../store/store";

interface InitialTodosState {
  value: TodoItem[] | [];
}

const initialState: InitialTodosState = {
  value: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.value = action.payload;
    },
    addTodotoBoard: (state, action: PayloadAction<Todo>) => {
      state.value[0].items = [...state.value[0].items, action.payload];
    },
    deleteTodoFromBoard: (
      state,
      action: PayloadAction<Pick<Todo, "_id" | "status">>
    ) => {
      const { status, _id } = action.payload;
      const selectedStatus = state.value.find((item) => item.name === status);
      if (selectedStatus) {
        selectedStatus.items = selectedStatus.items.filter(
          (item) => item._id !== _id
        );
      }
    },
    addUpdatedTodo: (state, action: PayloadAction<Todo>) => {
      const { status, _id } = action.payload;
      const selectedStatus = state.value.find((item) => item.name === status);
      if (selectedStatus) {
        selectedStatus.items = selectedStatus.items.map((item) => {
          if (item._id === _id) {
            return action.payload;
          }
          return item;
        });
      }
    },
  },
});

export const { setTodos, addTodotoBoard, deleteTodoFromBoard, addUpdatedTodo } =
  todosSlice.actions;

export const selectTodosValue = (state: RootState) => state.todos.value;

export default todosSlice.reducer;
