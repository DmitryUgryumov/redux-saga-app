import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import counter from "./slices/counter";

const rootReducer = combineReducers({
  counter,
});

const store = configureStore({
  reducer: rootReducer,
});

export type StateType = ReturnType<typeof rootReducer>;
export type ThunkType<R = void, A extends Action = Action> = ThunkAction<
  R,
  StateType,
  any,
  A
>;

export { store };
