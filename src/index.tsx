import React from "react";
import { render } from "react-dom";
import "./assets/index.scss";
import { Calendar } from "./containers/calendar/Calendar";
import { WindowSizeProvider } from "./utility/WindowSizeManager";
import { EventManagerProvider } from "./utility/EventManager";

const Application = () => {
  return (
    <WindowSizeProvider>
      <EventManagerProvider>
        <Calendar />
      </EventManagerProvider>
    </WindowSizeProvider>
  );
};

render(<Application />, document.getElementById("root"));
