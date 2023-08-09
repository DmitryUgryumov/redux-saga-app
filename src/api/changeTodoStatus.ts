import { ITodo } from "../interfaces/todo";
import axios from "axios";

export const changeTodoStatus = async (todo: ITodo): Promise<ITodo> => {
  const { data } = await axios.put<ITodo>(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      ...todo,
      completed: !todo.completed,
    },
  );
  return data;
};
