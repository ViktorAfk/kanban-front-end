import { useEffect } from "react";
import { useGetTodosInBoardQuery } from "../redux/services/api-data";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { getFiltteredTodos } from "../utiels";
import { selectTodosValue, setTodos } from "../redux/services/todos";
import { ColumnHeader, TodoItem } from "../types/interface";

export const useFilteredTodos = (boardId: string | null) => {
  const dispatch = useAppDispatch();
  const { data, error: hasError } = useGetTodosInBoardQuery(boardId, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const todos = useAppSelector(selectTodosValue);

  useEffect(() => {
    if (boardId) {
      const initialData: TodoItem[] = [
        { name: ColumnHeader.ToDO, items: [] },
        { name: ColumnHeader.InProgress, items: [] },
        { name: ColumnHeader.Done, items: [] },
      ];

      const preaperedTodos = data ? getFiltteredTodos(data.todos) : initialData;

      dispatch(setTodos(preaperedTodos));
    }
  }, [data, boardId, dispatch]);

  return { hasError, todos };
};
