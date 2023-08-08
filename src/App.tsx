import { useDispatch, useSelector } from "react-redux";
import { StateType } from "./store/store";
import {
  customCounter,
  minusCounter,
  plusCounter,
} from "./store/slices/counter";

const App = () => {
  const counter = useSelector((state: StateType) => state.counter.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{counter}</div>
      <br />
      <button onClick={() => dispatch(plusCounter())}>Plus</button>
      <button onClick={() => dispatch(minusCounter())}>Minus</button>
      <button
        onClick={() =>
          dispatch(
            customCounter({
              counter: 100,
            }),
          )
        }
      >
        100
      </button>
    </div>
  );
};

export default App;
