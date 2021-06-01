import React from "react";
import { useWindowSizeManager } from "../../utility/WindowSizeManager";
import { useDateTimeManager } from "../../utility/DateTimeManager";

export function ColHeader() {
  const { state: windowSizeState } = useWindowSizeManager();
  const { state: dateTimeState } = useDateTimeManager();
  const heightOfHeaderColumn = 60;
  const elements = [];

  const style: React.CSSProperties = {
    width: windowSizeState.colWidth && windowSizeState.colWidth - 1, //-1 for border pixel
    height: heightOfHeaderColumn + "px",
  };

  const currentDateTime = new Date(dateTimeState.mondayOfTheCurrentWeek);

  elements.push(
    <div
      key={0}
      className="border-right flex-col"
      style={{ width: "40px", height: heightOfHeaderColumn + "px" }}
    ></div>
  );
  for (let i = 1; i < 8; i++) {
    elements.push(
      <div
        key={i}
        className="border-right flex-col"
        style={style}
      >
        <span>{currentDateTime.toString("ddd M/d")}</span>
      </div>
    );
    currentDateTime.setDate(currentDateTime.getDate() + 1);
  }

  return <div className="flex-row sticky-header border-bottom background-color-white">{elements}</div>;
}
