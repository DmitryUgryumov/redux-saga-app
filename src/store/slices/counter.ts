import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    customCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    plusCounter: (state) => {
      state.counter++;
    },
    minusCounter: (state) => {
      state.counter--;
    },
  },
});

const { actions, reducer } = counterSlice;
export const { plusCounter, minusCounter, customCounter } = actions;
export default reducer;
