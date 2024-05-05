type Status = "Todo" | "In progress" | "Done";

export interface Todo {
  id: string;
  title: string;
  body: string;
  status: Status;
  index: number;
  boardId: string;
}

export enum ColumnHeader {
  ToDO = "Todo",
  InProgress = "In progress",
  Done = "Done",
}

export interface ApiResponse {
  count: number;
  nextPage: string | null;
  previousPage: string | null;
  todos: Todo[]
}

export type TodoItem = {
  name: Status;
  items: Todo[] | [];
};