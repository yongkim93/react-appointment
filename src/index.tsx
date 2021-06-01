import React from "react";
import { render } from "react-dom";
import "./assets/index.scss";
import { Calendar } from "./containers/calendar/Calendar";
import { WindowSizeProvider } from "./utility/WindowSizeManager";

const Application = () => {
  return (
    <WindowSizeProvider>
      <Calendar />
    </WindowSizeProvider>
  );
};

render(<Application />, document.getElementById("root"));
