import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../interfaces/todo.interface";

interface IState {
  todos: ITodo[];
  isMainLoading: boolean;
  isSubLoading: boolean;
  todosWithChanges: number[];
  isError: boolean;
  _start: number;
  _limit: number;
}

const initialState: IState = {
  todos: [],
  isMainLoading: false,
  todosWithChanges: [],
  isSubLoading: false,
  isError: false,
  _start: 0,
  _limit: 10,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setNewTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = [...state.todos, ...action.payload];
    },
    setStartParam: (state, action: PayloadAction<number>) => {
      state._start = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<{
        isMainLoading: boolean;
        isSubLoading: boolean;
      }>,
    ) => {
      const { isMainLoading, isSubLoading } = action.payload;
      state.isMainLoading = isMainLoading;
      state.isSubLoading = isSubLoading;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    changeTodoCompleted: (state, action: PayloadAction<ITodo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      );
    },
    setTodoWithChange: (
      state,
      action: PayloadAction<{
        id: number;
        isAddId: boolean;
      }>,
    ) => {
      const { id, isAddId } = action.payload;

      if (isAddId) {
        state.todosWithChanges.push(id);
        return;
      }

      state.todosWithChanges = state.todosWithChanges.filter(
        (todoId) => todoId !== id,
      );
    },
  },
});

const { actions, reducer } = todosSlice;

export const {
  setNewTodos,
  setLoading,
  setStartParam,
  setError,
  changeTodoCompleted,
  setTodoWithChange,
} = actions;
export default reducer;
