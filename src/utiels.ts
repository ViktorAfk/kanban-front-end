import { DropResult } from "react-beautiful-dnd";
import { ColumnHeader, Todo, TodoItem, Status } from "./types/interface";

const getSortedAndFilteredArray = (todos: Todo[], status: Status) => {
  return todos
    .filter((todo) => todo.status === status)
    .sort((a, b) => a.index - b.index);
};

export const getFiltteredTodos = (items: Todo[]) => {
  return [
    {
      name: ColumnHeader.ToDO,
      items: getSortedAndFilteredArray(items, ColumnHeader.ToDO),
    },
    {
      name: ColumnHeader.InProgress,
      items: getSortedAndFilteredArray(items, ColumnHeader.InProgress),
    },
    {
      name: ColumnHeader.Done,
      items: getSortedAndFilteredArray(items, ColumnHeader.Done),
    },
  ];
};

export const getNewItemsDestination = (
  items: TodoItem[],
  results: DropResult
):
  | {
      newItems: TodoItem[];
      dataToUpdate: Pick<Todo, "_id" | "status" | "index">;
    }
  | undefined => {
  const { source, destination } = results;

  if (!destination) {
    return;
  }

  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  const sourceKey = items.findIndex(
    (issue) => issue.name === source.droppableId
  );
  const destinationKey = items.findIndex(
    (issue) => issue.name === destination.droppableId
  );
  const newSourceItems = [...items[sourceKey].items];

  const newDestionationItems =
    source.droppableId !== destination.droppableId
      ? [...items[destinationKey].items]
      : newSourceItems;

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

  const todo = newItems[destinationKey].items[destination.index];
  const dataToUpdate = {
    _id: todo._id,
    status: destination.droppableId as Status,
    index: destination.index,
  };

  return { newItems, dataToUpdate };
};
