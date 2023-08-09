import { all, call, put, select, takeEvery } from "typed-redux-saga";
import { CHANGE_TODO_COMPLETED, GET_TODOS } from "./todos.types";
import { ITodo } from "../../interfaces/todo.interface";
import {
  changeTodoCompleted,
  setError,
  setLoading,
  setNewTodos,
  setStartParam,
  setTodoWithChange,
} from "./todos.slice";
import { changeTodoStatusApi as changeTodoStatusApi } from "../../api/changeTodoStatus.api";
import { StateType } from "../store";
import { getTodosApi as getTodosApi } from "../../api/getTodos.api";

function* getTodos() {
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

function* changeTodoStatus(action: { type: string; payload: ITodo }) {
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

export function* todosSaga() {
  yield* all([
    takeEvery(GET_TODOS, getTodos),
    takeEvery(CHANGE_TODO_COMPLETED, changeTodoStatus),
  ]);
}
