import { DropResult } from "react-beautiful-dnd";
import { ColumnHeader, Todo, TodoItem } from "./types/interface";

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

export const getNewItemsDestination = (items: TodoItem[], results: DropResult) => {
  const { source, destination } = results;

  if (!destination) {
    return;
  }

  if (source.droppableId === destination.droppableId && source.index === destination.index) {
    return;
  }

  const sourceKey = items.findIndex((issue) => issue.name === source.droppableId);
  const destinationKey = items.findIndex((issue) => issue.name === destination.droppableId);

  const newSourceItems = [...items[sourceKey].items];

  const newDestionationItems =
    source.droppableId !== destination.droppableId ? [...items[destinationKey].items] : newSourceItems;

  const [deletedItem] = newSourceItems.splice(source.index, 1);
  newDestionationItems.splice(destination.index, 0, deletedItem);

  const newItems = [...items];

  newItems[sourceKey] = {
    ...items[sourceKey],
    items: newSourceItems,
  };

  newItems[destinationKey] = {
    ...items[destinationKey],
    items: newDestionationItems,
  };
  return newItems;
};