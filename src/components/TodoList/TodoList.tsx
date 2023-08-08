import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store/store";
import { GET_TODOS } from "../../store/types/todos";

const TodoList = () => {
  const todos = useSelector((state: StateType) => state.todos.todos);
  const isLoading = useSelector((state: StateType) => state.todos.isLoading);
  const isError = useSelector((state: StateType) => state.todos.isError);
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <div>Error</div>
        <button
          onClick={() =>
            dispatch({
              type: GET_TODOS,
            })
          }
        >
          get todo again
        </button>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>{`${index + 1}. ${todo.title}`}</li>
        ))}
      </ul>
      <button
        onClick={() =>
          dispatch({
            type: GET_TODOS,
          })
        }
      >
        get todo
      </button>
    </div>
  );
};

export default TodoList;
