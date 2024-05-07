import { useState } from "react";
import {
  useAddNewTodoMutation,
  useUpdateTodoMutation,
} from "../redux/services/api-data";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import {
  addTodotoBoard,
  addUpdatedTodo,
  selectTodosValue,
} from "../redux/services/todos";
import { Todo } from "../types/interface";

export const useHandleChange = (board: string | null, onClose: () => void) => {
  const [updateTodo] = useUpdateTodoMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState<Todo | null>(null);
  const [addNewTodo] = useAddNewTodoMutation();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodosValue);

  const onEditHandleChange = (todo: Todo) => {
    const { title: todoTitle, body } = todo;

    setTodo(todo);
    setDescription(body);
    setTitle(todoTitle);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    setDescription(value);
  };

  const onHandleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsError(false);
    const preaperdTitle = title.trim();
    const preaperdDescription = description.trim();

    if (todo) {
      const pathcedTodo = {
        _id: todo._id,
        title: preaperdTitle,
        body: preaperdDescription,
      };

      updateTodo(pathcedTodo)
        .unwrap()
        .then((data) => {
          dispatch(addUpdatedTodo(data));
          setTodo(null);
          onClose();
        })
        .catch(() => setIsError(true))
        .finally(() => {
          setIsDisabled(false);
        });
      return;
    }

    if (!preaperdTitle || !preaperdDescription) {
      setIsError(true);
      setIsDisabled(false);
      return;
    }

    if (board) {
      const newTodo: Omit<Todo, "_id"> = {
        title,
        body: description,
        status: "Todo",
        boardId: board,
        index: todos[0].items.length + 1,
      };

      addNewTodo(newTodo)
        .unwrap()
        .then((data) => {
          dispatch(addTodotoBoard(data));
          setDescription("");
          setTitle("");
          onClose();
        })
        .catch(() => setIsError(true))
        .finally(() => {
          setIsDisabled(false);
        });
    }
  };
  return {
    onHandleSubmit,
    handleDescriptionChange,
    handleTitleChange,
    isDisabled,
    isError,
    onEditHandleChange,
    title,
    description,
  };
};
