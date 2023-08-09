import { takeEvery, put, call, all, select } from "typed-redux-saga";
import {
  setNewTodos,
  setLoading,
  setStartParam,
  setError,
  changeTodoCompleted,
  setTodoWithChange,
} from "../slices/todos";
import { getTodos as getTodosApi } from "../../api/getTodos";
import { changeTodoStatus as changeTodoStatusApi } from "../../api/changeTodoStatus";
import { ITodo } from "../../interfaces/todo";
import { CHANGE_TODO_COMPLETED, GET_TODOS } from "../types/todos";
import { StateType } from "../store";

export function* getTodos() {
  try {
    const { _start, _limit } = yield* select((state: StateType) => state.todos);

    yield put(
      setLoading({
        isMainLoading: _start === 0,
        isSubLoading: true,
      }),
    );
    const todos = yield* call(getTodosApi, {
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

export function* changeTodoStatus(action: { type: string; payload: ITodo }) {
  try {
    yield put(
      setTodoWithChange({
        isAddId: true,
        id: action.payload.id,
      }),
    );
    const todo = yield* call(changeTodoStatusApi, action.payload);
    yield put(changeTodoCompleted(todo));
  } catch (error) {
    yield put(setError(true));
  } finally {
    yield put(
      setTodoWithChange({
        isAddId: false,
        id: action.payload.id,
      }),
    );
  }
}

export default function* rootSaga() {
  yield* all([
    takeEvery(GET_TODOS, getTodos),
    takeEvery(CHANGE_TODO_COMPLETED, changeTodoStatus),
  ]);
}
