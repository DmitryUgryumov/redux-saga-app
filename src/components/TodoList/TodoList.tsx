import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store/store";
import { GET_TODOS } from "../../store/types/todos";
import FetchButton from "./FetchButton/FetchButton";

const TodoList = () => {
  const todos = useSelector((state: StateType) => state.todos.todos);
  const isMainLoading = useSelector(
    (state: StateType) => state.todos.isMainLoading,
  );
  const isSubLoading = useSelector(
    (state: StateType) => state.todos.isSubLoading,
  );
  const isError = useSelector((state: StateType) => state.todos.isError);
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
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>{`${index + 1}. ${todo.title}`}</li>
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
