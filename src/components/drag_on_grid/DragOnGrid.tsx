import React, { useLayoutEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { useDraw } from "~/utility/DragHandler";
import { CreateApptDiv } from "../create_appt_on_grid/CreateApptOnGrid";
import { DispatchNode } from "~/models/common";

type Props = {
  setApptDivState: DispatchNode;
  activateModal: () => void;
};
/* eslint-disable camelcase */
export function DragOnGrid({ setApptDivState, activateModal }: Props) {
  const {
    x_start,
    y_start,
    x_end,
    y_end,
    selectedRef,
    reset,
    setMouseStartPosition,
    setMouseEndPosition,
  } = useDraw();

  const mystyle: React.CSSProperties = {
    position: "absolute",
    width:
      (x_end &&
        x_start &&
        (x_end - x_start < -1 ? "unset" : x_end - x_start)) ||
      "unset",
    height:
      (y_end &&
        y_start &&
        (y_end - y_start < -1 ? "unset" : y_end - y_start)) ||
      "unset",
    backgroundColor: "yellow",
    left: x_start || "unset",
    top: y_start || "unset",
  };

  const onMouseUp = () => {
    let x_start: number = 0,
      y_start: number = 0,
      x_end: number = 0,
      y_end: number = 0;

    setMouseStartPosition((value) => {
      x_start = value.x_start || 0;
      y_start = value.y_start || 0;
      return value;
    });

    if (x_start && y_start) {
      setMouseEndPosition((value) => {
        x_end = value.x_end || 0;
        y_end = value.y_end || 0;
        return value;
      });

      // must add key later
      if (x_end - x_start > 1 && y_end - y_start > 1) {
        // props.setSelected(() => selectedRef.current);

        setApptDivState(() =>
          CreateApptDiv(x_end - x_start, y_end - y_start, x_start, y_start)
        );
        activateModal();
      }
    }
    reset();
  };

  const onMouseDown = () => {
    // props.setDragDiv(() => <div></div>);
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

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div style={mystyle}></div>,
        document.getElementById("root") as HTMLElement
      )}
    </Fragment>
  );
}
