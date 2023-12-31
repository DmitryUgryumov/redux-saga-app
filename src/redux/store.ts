import {
  combineReducers,
  configureStore,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import todos from "./todos/todos.slice";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  todos,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StateType,
  unknown,
  Action<string>
>;

export { store };
