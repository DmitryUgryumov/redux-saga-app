import { useSelector } from "react-redux";
import { StateType } from "../store";

export const selectTodos = (state: StateType) => state.todos.todos;
export const selectIsMainLoading = (state: StateType) =>
  state.todos.isMainLoading;
export const selectIsSubLoading = (state: StateType) =>
  state.todos.isSubLoading;
export const selectIsError = (state: StateType) => state.todos.isError;
export const selectTodosWithChanges = (state: StateType) =>
  state.todos.todosWithChanges;
