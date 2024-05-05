import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Todo } from "../../types/interface";

export const todosApi = createApi({
  reducerPath: "ApiResponse",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kanban-api-mfy5.onrender.com/",
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodosInBoard: builder.query<ApiResponse, string>({
      query: (boardId) => ({ url: `todos/${boardId}`, method: "Get" }),
    }),
    addNewTodo: builder.mutation<Todo, Omit<Todo, "id">>({
      query: (body) => ({ url: "todos/", method: "Post", body }),
    }),

    deleteTodo: builder.mutation({
      query: (todoId: string) => ({ url: `todos/${todoId}`, method: "Delete" }),
    }),

    updateTods: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({ url: `todos/${todo.id}`, method: "Post", todo }),
    }),
  }),
});

export const {useAddNewTodoMutation, useGetTodosInBoardQuery} = todosApi;

