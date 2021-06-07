import React, { useLayoutEffect, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const useApptDiv = () => useState(<div></div>);
export const CreateApptDiv = (
  width: number,
  height: number,
  left: number,
  top: number
) => {
  const style = {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "yellow",
    left: left,
    top: top,
  } as React.CSSProperties;

  return (
    <div
      id="apptDiv"
      style={style}
    ></div>
  );
};

export function CreateApptOnGrid(props: any) {
  useEffect(() => {
    console.log(props.apptDivState);
  }, [props.apptDiv]);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        props.apptDivState,
        document.getElementById("root") as HTMLElement
      )}
    </Fragment>
  );
}
