import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_TODO_COMPLETED,
  GET_TODOS,
} from "../../redux/todos/todos.types";
import FetchButton from "./FetchButton/FetchButton";
import "./TodoList.css";
import {
  selectIsError,
  selectIsMainLoading,
  selectIsSubLoading,
  selectTodos,
  selectTodosWithChanges,
} from "../../redux/todos/todos.selectors";

const TodoList = () => {
  const todos = useSelector(selectTodos);
  const isMainLoading = useSelector(selectIsMainLoading);
  const isSubLoading = useSelector(selectIsSubLoading);
  const isError = useSelector(selectIsError);
  const todosWithChange = useSelector(selectTodosWithChanges);

  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch({
      type: GET_TODOS,
    });
  };

  if (isMainLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <div>Error</div>
        <FetchButton
          title="get todos again"
          onCLick={getTodos}
          isLoading={isSubLoading}
        />
      </div>
    );
  }

  return (
    <div className="list-container">
      <ul className="list">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className={
              todosWithChange.includes(todo.id) ? "todo-item-disabled" : ""
            }
          >
            <label
              htmlFor={todo.id.toString()}
              className={todo.completed ? "todo-completed" : ""}
            >{`${index + 1}. ${todo.title}`}</label>
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id.toString()}
              onChange={() => {
                dispatch({
                  type: CHANGE_TODO_COMPLETED,
                  payload: todo,
                });
              }}
            />
          </li>
        ))}
      </ul>
      <FetchButton
        title="get todos"
        onCLick={getTodos}
        isLoading={isSubLoading}
      />
    </div>
  );
};

export default TodoList;
