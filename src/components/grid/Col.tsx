import React, { Fragment } from "react";
import { useWindowSizeManager } from "../../utility/WindowSizeManager";

export default function Col() {
  const { state: windowSizeState } = useWindowSizeManager();
  //   const { state: dateTimeManager } = useDateTimeManager();
  const elements = [];

  //   const date = new Date(dateTimeManager.mondayOfTheCurrentWeek);

  const style: React.CSSProperties = {
    width: windowSizeState.colWidth && windowSizeState.colWidth - 1, // -1 for border px
    height: windowSizeState.height,
  };

  for (let i = 0; i < 7; i++) {
    // const startDateTime = getDateToEpoch(date);
    // date.setDate(date.getDate() + 1);
    // const endDateTime = getDateToEpoch(date);
    elements.push(<div key={i} className="border-right" style={style} />);
  }

  return <Fragment>{elements}</Fragment>;
}
