import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/interface";
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
  },
});

export const { setTodos } = todosSlice.actions;

export const selectTodosValue = (state: RootState) => state.todos.value;

export default todosSlice.reducer;
