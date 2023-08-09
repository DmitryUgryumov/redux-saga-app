import axios from "axios";
import { ITodo } from "../interfaces/todo.interface";

interface IParams {
  _start?: number;
  _limit?: number;
}

export const getTodosApi = async (params: IParams): Promise<ITodo[]> => {
  const { data } = await axios.get<ITodo[]>(
    "https://jsonplaceholder.typicode.com/todos",
    {
      params,
    },
  );
  return data;
};
