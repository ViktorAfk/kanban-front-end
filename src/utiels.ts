import { ColumnHeader, Todo } from "./types/interface";

export const getFiltteredTodos = (items: Todo[]) => {
  const todo = items.filter(({ status }) => status === ColumnHeader.ToDO);
  const in_progress = items.filter(({ status }) => status === ColumnHeader.InProgress);
  const done = items.filter(({ status }) => status === ColumnHeader.Done);

  return [
    { name: ColumnHeader.ToDO, items: todo },
    { name: ColumnHeader.InProgress, items: in_progress },
    { name: ColumnHeader.Done, items: done },
  ];
};