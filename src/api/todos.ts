import axios from "axios";
import { ITodo } from "../interfaces/todo";

interface IParams {
  _start?: number;
  _limit?: number;
}

export const getTodos = async (params: IParams): Promise<ITodo[]> => {
  const { data } = await axios.get<ITodo[]>(
    "https://jsonplaceholder.typicode.com/todos",
    {
      params,
    },
  );
  return data;
};
