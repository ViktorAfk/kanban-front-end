import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Todo } from "../../types/interface";

export const todosApi = createApi({
  reducerPath: "ApiResponse",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kanban-api-mfy5.onrender.com/",
  }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodosInBoard: builder.query<ApiResponse, string | null>({
      query: (boardId) => ({ url: `todos/${boardId}`, method: "GET" }),
    }),
    addNewTodo: builder.mutation<Todo, Omit<Todo, "_id">>({
      query: (body) => ({ url: "todos/", method: "POST", body }),
    }),

    deleteTodo: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `todos/${id}`, method: "DELETE" }),
    }),

    updateTodo: builder.mutation<Todo, Partial<Todo> & Pick<Todo, "_id">>({
      query: ({ _id, ...todo }) => ({
        url: `todos/${_id}`,
        method: "PATCH",
        body: todo,
      }),
    }),
  }),
});

export const {
  useGetTodosInBoardQuery,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
