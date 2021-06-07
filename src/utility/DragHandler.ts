import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useWindowSizeManager } from "./WindowSizeManager";

type MouseStartPosition = {
  x_start: null | number;
  y_start: null | number;
};
type MouseEndPosition = {
  x_end: null | number;
  y_end: null | number;
};
type Selected = {
  col_start: null | number;
  row_start: null | number;
  col_end: null | number;
  row_end: null | number;
};

const useDraw = () => {
  const { getState: getWindowSizeState } = useWindowSizeManager();
  const myref = useRef(0);

  const [mouseStartPosition, setMouseStartPosition] =
    useState<MouseStartPosition>({
      x_start: null,
      y_start: null,
    });
  const [mouseEndPosition, setMouseEndPosition] = useState<MouseEndPosition>({
    x_end: null,
    y_end: null,
  });

  const selectedRef = useRef<Selected>({
    col_start: null,
    row_start: null,
    col_end: null,
    row_end: null,
  });

  const reset = () => {
    setMouseStartPosition({ x_start: null, y_start: null });
    setMouseEndPosition({ x_end: null, y_end: null });
    selectedRef.current = {
      col_start: null,
      row_start: null,
      col_end: null,
      row_end: null,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (e.offsetY - myref.current > 0) {
      setMouseEndPosition(() => {
        return {
          x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth,
          y_end:
            e.pageY -
            e.offsetY +
            Math.ceil(
              getWindowSizeState().interval *
                Math.ceil(e.offsetY / getWindowSizeState().interval)
            ),
        };
      });
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    myref.current = e.offsetY;
    window.addEventListener("mousemove", onMouseMove);

    const col = Math.round(
      (e.pageX - e.offsetX - getWindowSizeState().offsetLeft) /
        getWindowSizeState().colWidth
    );
    const row = Math.floor(
      (e.pageY - getWindowSizeState().offsetTop) /
        getWindowSizeState().rowHeight
    );
    selectedRef.current = {
      ...selectedRef.current,
      row_start: row,
      col_start: col,
    };

    setMouseStartPosition({
      x_start: e.pageX - e.offsetX,
      y_start:
        e.pageY -
        e.offsetY -
        1 +
        getWindowSizeState().interval *
          Math.floor(e.offsetY / getWindowSizeState().interval),
    });
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    window.removeEventListener("mousemove", onMouseMove);

    const col = Math.round(
      (e.pageX - e.offsetX - getWindowSizeState().offsetLeft) /
        getWindowSizeState().colWidth
    );
    const row = Math.floor(
      (e.pageY - getWindowSizeState().offsetTop) /
        getWindowSizeState().rowHeight
    );
    selectedRef.current = {
      ...selectedRef.current,
      row_end: row,
      col_end: col,
    };

    // setMouseEndPosition((prev) => {
    //   if (prev.y_end) {
    //     return {
    //       x_end: e.pageX - e.offsetX + getWindowSizeState().colWidth,
    //       y_end:
    //         e.pageY -
    //         e.offsetY +
    //         getWindowSizeState().interval *
    //           Math.ceil(e.offsetY / getWindowSizeState().interval),
    //     };
    //   } else {
    //     return prev;
    //   }
    // });
  };

  useLayoutEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    const grid = document.getElementById("vertical_grid");
    grid && grid.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      grid && grid.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return {
    ...mouseStartPosition,
    ...mouseEndPosition,
    selectedRef,
    setMouseStartPosition,
    setMouseEndPosition,
    reset,
  };
};

export { useDraw };
