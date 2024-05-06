import { FC, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Grid,
} from "@chakra-ui/react";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DraggableColumn } from "./DragableColumn";
import { useFilteredTodos } from "../hooks/useFiltredTodos";
import { setTodos } from "../redux/services/todos";
import { useAppDispatch } from "../hooks/redux-hooks";
import { getNewItemsDestination } from "../utiels";
import {
  useUpdateTodoMutation,
} from "../redux/services/api-data";
import { Todo } from "../types/interface";

interface Props {
  boardId: string | null;
  openModal: () => void;
  editTodo: (todo: Todo) => void;
}

export const TodosTable: FC<Props> = ({ boardId, openModal, editTodo }) => {
  const { todos, hasError } = useFilteredTodos(boardId);
  const [updateTodo] = useUpdateTodoMutation();
  const dispatch = useAppDispatch();

  const handleDragDrop = (results: DropResult) => {
    const data = getNewItemsDestination(todos, results);

    if (data?.newItems) {
      dispatch(setTodos(data.newItems));
    }

    if (data?.dataToUpdate) {
      updateTodo(data?.dataToUpdate).unwrap();
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      {hasError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Oops, something went wrong</AlertTitle>
          <AlertDescription>
            Are you sure your repo exists? Please check information about your
            repo.
          </AlertDescription>
        </Alert>
      ) : (
        <Grid
          w={"100%"}
          templateColumns={{
            base: "repeat(1, minmax(200px, 1fr))",
            md: "repeat(3, minmax(220px, 1fr))",
          }}
          gap={4}
        >
          <DragDropContext onDragEnd={handleDragDrop}>
            {todos.map(({ name, items }) => (
              <DraggableColumn
                editTodo={editTodo}
                openModal={openModal}
                todos={items}
                columnTitle={name}
                key={name}
              />
            ))}
          </DragDropContext>
        </Grid>
      )}
    </>
  );
};
