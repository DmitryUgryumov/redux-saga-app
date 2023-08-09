import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../interfaces/todo";

interface IState {
  todos: ITodo[];
  isMainLoading: boolean;
  isSubLoading: boolean;
  isError: boolean;
  _start: number;
  _limit: number;
}

const initialState: IState = {
  todos: [],
  isMainLoading: false,
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
  },
});

const { actions, reducer } = todosSlice;

export const { setNewTodos, setLoading, setStartParam, setError } = actions;
export default reducer;
