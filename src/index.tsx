import React from "react";
import { render } from "react-dom";
import "./assets/index.scss";
import { Rectangle, getCounter } from "./utility/useEnhancedReducer";

const Application = () => {
  const rec = new Rectangle();
  console.log(rec.area());
  const callable = getCounter();
  console.log(callable(12));
  return <h1>Application {rec.area()}</h1>;
};

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}

render(<Application />, document.getElementById("root"));
