import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosApi } from "../services/api-data";
import boardReducer from "../services/board";
import todosReducer from '../services/todos';

export const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
  board: boardReducer,
  todos: todosReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
