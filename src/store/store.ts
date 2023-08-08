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

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateType,
  unknown,
  Action<string>
>;

export { store };
