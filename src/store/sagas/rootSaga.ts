import { takeEvery, put, call, all, select } from "@redux-saga/core/effects";
import {
  setNewTodos,
  setLoading,
  setStartParam,
  setError,
} from "../slices/todos";
import { getTodos as getTodosApi } from "../../api/todos";
import { ITodo } from "../../interfaces/todo";
import { GET_TODOS } from "../types/todos";
import { StateType } from "../store";

export function* getTodos() {
  try {
    const { _start, _limit } = yield select((state: StateType) => state.todos);

    yield put(
      setLoading({
        isMainLoading: _start === 0,
        isSubLoading: true,
      }),
    );
    const todos: ITodo[] = yield call(getTodosApi, {
      _start,
      _limit,
    });

    yield put(setNewTodos(todos));
    yield put(setStartParam(_start + _limit));
    yield put(setError(false));
  } catch (error) {
    yield put(setError(true));
  } finally {
    yield put(
      setLoading({
        isMainLoading: false,
        isSubLoading: false,
      }),
    );
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_TODOS, getTodos);
  // yield all([takeEvery(GET_TODOS, getTodos)]);
}
