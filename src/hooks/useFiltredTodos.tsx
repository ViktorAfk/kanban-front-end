import { useEffect } from "react";
import { useGetTodosInBoardQuery } from "../redux/services/api-data";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { getFiltteredTodos } from "../utiels";
import { selectTodosValue, setTodos } from "../redux/services/todos";

export const useFilteredTodos = (boardId: string | null) => {
  const dispatch = useAppDispatch();
  const { data, error: hasError } = useGetTodosInBoardQuery(boardId, {
    skip: !boardId,
  });
  const todos = useAppSelector(selectTodosValue);

  useEffect(() => {
    if (data) {
      const preapredTodos = getFiltteredTodos(data?.todos);
      dispatch(setTodos(preapredTodos));
    }
  }, [data, boardId, dispatch]);

  return { hasError, todos };
};
