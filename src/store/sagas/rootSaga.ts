import { takeEvery, put, call, all } from "@redux-saga/core/effects";
import { setTodo, setLoading } from "../slices/todos";
import { getInitialTodo } from "../../api/todos";
import { ITodo } from "../../interfaces/todo";
import { GET_TODOS } from "../types/todos";

export function* getTodos() {
  try {
    yield put(setLoading(true));
    const todos: ITodo[] = yield call(getInitialTodo);
    yield put(setTodo(todos));
  } catch (e) {
    console.log(e);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_TODOS, getTodos);
  // yield all([takeEvery(GET_TODOS, getTodos)]);
}
