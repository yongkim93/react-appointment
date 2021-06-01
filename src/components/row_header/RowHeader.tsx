import React from "react";
import { useWindowSizeManager } from "../../utility/WindowSizeManager";

export function RowHeader() {
  const { state: windowSizeState } = useWindowSizeManager();
  const elements = [];
  let j = 0;
  const hours = [
    "",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 AM",
  ];
  const style = (width: number) => {
    return {
      width: width + "px",
      height: windowSizeState.rowHeight && windowSizeState.rowHeight - 1, // -1 for the border pixel
    };
  };

  const timeStyle: React.CSSProperties = {
    width: "30px",
    height: windowSizeState.rowHeight && windowSizeState.rowHeight - 1, // -1 for the border pixel
    position: "relative",
    top: -7, // -windowSizeState?.rowHeight - 10 + 'px', // +10px for fontsize
    fontSize: "10px",
  };

  for (let i = 0; i < 47; i++) {
    if (i % 2) {
      elements.push(
        <div key={i} className="flex-row">
          <div style={timeStyle}></div>
          <div className="border-right border-bottom" style={style(10)}></div>
        </div>
      );
    } else {
      elements.push(
        <div
          key={i}
          className="border-right border-bottom-dashed"
          style={style(40)}
        >
          <div style={timeStyle}>{hours[j++]}</div>
        </div>
      );
    }
  }
  elements.push(
    <div key={48} className="flex-row">
      <div className="border-right border-bottom" style={style(40)}></div>
    </div>
  );
  return <div className="row-header">{elements}</div>;
}
