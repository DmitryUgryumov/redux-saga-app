import axios from "axios";
import { ITodo } from "../interfaces/todo";

export const getInitialTodo = async (): Promise<ITodo[]> => {
  const { data } = await axios.get<ITodo[]>(
    "https://jsonplaceholder.typicode.com/todos?_start=10&_limit=20",
  );
  return data;
};
