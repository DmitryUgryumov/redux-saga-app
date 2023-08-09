import { todosSaga } from "./todos/todos.saga";

export default function* rootSaga() {
  yield* todosSaga();
}
