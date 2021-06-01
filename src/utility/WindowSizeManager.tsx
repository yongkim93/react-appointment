import React, { useContext, createContext, useLayoutEffect } from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import { Children } from "../models/common";

// type WSP_State1 = {
//   width: number;
//   height: number;
//   colWidth: number;
//   rowHeight: number;
//   interval: number;
//   intervalMinutes: number;
//   offsetLeft: number;
//   offsetTop: number;
// };

type WSP_State2 = {
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
};

type WSP_State = {
  width: number;
  height: number;
  colWidth: number;
  rowHeight: number;
  interval: number;
  intervalMinutes: number;
  offsetLeft: number;
  offsetTop: number;
};
2;

type WSP_Action = {
  type: "RESIZE";
  payload: WSP_State2;
};

const initialState = {
  width: 0,
  height: 0,
  offsetTop: 0,
  offsetLeft: 0,
  colWidth: 0,
  rowHeight: 0,
  interval: 0,
  intervalMinutes: 0,
};

const windowSizeInfo = createContext<{
  state: WSP_State;
  dispatch: React.Dispatch<WSP_Action>;
  getState: () => WSP_State;
}>({
  state: initialState,
  dispatch: () => undefined,
  getState: () => initialState,
});

const { Provider } = windowSizeInfo;

const WindowSizeProvider = ({ children }: Children) => {
  const [state, dispatch, getState] = useEnhancedReducer<WSP_State, WSP_Action>(
    (state, action) => {
      const { width, height, offsetLeft, offsetTop } = action.payload;
      switch (action.type) {
        case "RESIZE":
          return {
            width,
            height,
            colWidth: Math.round(width / 7) - 1, // -1 for the border px
            rowHeight: height / 48,
            interval: height / 24 / 2,
            intervalMinutes: 30,
            offsetLeft,
            offsetTop,
          };
        default:
          return state;
      }
    },
    initialState
  );

  function dispatchOnResize() {
    const el = document.getElementById("vertical_grid");
    dispatch({
      type: "RESIZE",
      payload: {
        width: el?.clientWidth || 0,
        height: el?.clientHeight || 0,
        offsetTop: el?.offsetTop || 0,
        offsetLeft: el?.offsetLeft || 0,
      },
    });
  }

  useLayoutEffect(() => {
    dispatchOnResize();
    window.addEventListener("resize", dispatchOnResize);

    return () => {
      window.addEventListener("resize", dispatchOnResize);
    };
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useWindowSizeManager = () => useContext(windowSizeInfo);

export { useWindowSizeManager, WindowSizeProvider };
