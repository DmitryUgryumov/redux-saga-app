import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../../interfaces/todo";

interface IState {
  todos: ITodo[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IState = {
  todos: [],
  isLoading: false,
  isError: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

const { actions, reducer } = todosSlice;

export const { setTodo, setLoading } = actions;
export default reducer;
