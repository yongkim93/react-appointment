import React, { useReducer, useRef, useCallback } from "react";

function useEnhancedReducer<T, U>(reducer: React.Reducer<T, U>, initState: T):[T, React.Dispatch<U>, () => T] {
  const lastState = useRef(initState);
  const getState = useCallback(() => lastState.current, []);
  return [
    ...useReducer(
      (state: T, action: U) => (lastState.current = reducer(state, action)),
      initState
    ),
    getState,
  ];
}

function useEnhancedReducer2<T, U>(
  reducer: React.Reducer<T, U>,
  initState: T
): [T, React.Dispatch<U>, () => T] {
  const lastState = useRef(initState);
  const getState = useCallback(() => lastState.current, []);
  const [state, dispatch] = useReducer(
    (state: T, action: U) => (lastState.current = reducer(state, action)),
    initState
  );
  return [state, dispatch, getState];
}

export default useEnhancedReducer;

class Point {
  x = 5;
  y: number;
}

interface Shape {
  area(): number;
}

type Perimeter = {
  perimiter(): number;
};

type RectangleShape = Partial<Shape & Perimeter> & Point;

export class Rectangle implements RectangleShape {
  x: number;
  y = 5;
  area = () => {
    return this.y;
  };
  perimiter = () => {
    return this.x;
  };
}

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

export const getCounter = () => {
  const dounter = ((start: number) => {}) as Counter;
  dounter.interval = 123;
  dounter.reset = () => {};
  return dounter;
};

const callable = getCounter();
callable(12);

type GenericComponentProps<T> = {
  prop: T;
  callback: (t: T) => void;
};
const GenericComponent = <T>(props: GenericComponentProps<T>) => {
  /*...*/
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
