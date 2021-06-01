import React, { Fragment } from "react";
import { useWindowSizeManager } from "../../utility/WindowSizeManager";

export default function Row() {
  const { state: windowSizeState } = useWindowSizeManager();
  const elements = [];

  const style = {
    width: windowSizeState.width,
    height: windowSizeState.rowHeight && windowSizeState.rowHeight - 1, // -1 for border px
  };

  for (let i = 0; i < 48; i++) {
    elements.push(
      <div
        key={i}
        className={`${
          i % 2 ? "border-bottom" : "border-bottom-dashed"
        }`}
        style={style}
      ></div>
    );
  }

  return <Fragment>{elements}</Fragment>;
}
