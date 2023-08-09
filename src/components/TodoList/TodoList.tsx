import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store/store";
import { CHANGE_TODO_COMPLETED, GET_TODOS } from "../../store/types/todos";
import FetchButton from "./FetchButton/FetchButton";
import "./TodoList.css";

const TodoList = () => {
  const todos = useSelector((state: StateType) => state.todos.todos);
  const isMainLoading = useSelector(
    (state: StateType) => state.todos.isMainLoading,
  );
  const isSubLoading = useSelector(
    (state: StateType) => state.todos.isSubLoading,
  );
  const isError = useSelector((state: StateType) => state.todos.isError);
  const todosWithChange = useSelector(
    (state: StateType) => state.todos.todosWithChanges,
  );

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
