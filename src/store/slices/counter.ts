import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    customCounter(state, action: PayloadAction<{ counter: number }>) {
      const { counter } = action.payload;
      state.counter = counter;
    },
    plusCounter(state) {
      state.counter++;
    },
    minusCounter(state) {
      state.counter--;
    },
  },
});

const { actions, reducer } = counterSlice;
export const { plusCounter, minusCounter, customCounter } = actions;
export default reducer;
