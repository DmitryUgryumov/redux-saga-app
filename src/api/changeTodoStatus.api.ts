import { ITodo } from "../interfaces/todo.interface";
import axios from "axios";

export const changeTodoStatusApi = async (todo: ITodo): Promise<ITodo> => {
  const { data } = await axios.put<ITodo>(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      ...todo,
      completed: !todo.completed,
    },
  );
  return data;
};
