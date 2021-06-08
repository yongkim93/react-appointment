import React, { Fragment, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

export const useApptDiv = () => useState<ReactNode>(<div></div>);
export const CreateApptDiv = (
  width: number,
  height: number,
  left: number,
  top: number
): ReactNode => {
  const style = {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "yellow",
    left: left,
    top: top,
  } as React.CSSProperties;

  return <div id="apptDiv" style={style}></div>;
};

export type Props = {
  apptDivState: ReactNode;
};

export function CreateApptOnGrid({ apptDivState }: Props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        apptDivState,
        document.getElementById("root") as HTMLElement
      )}
    </Fragment>
  );
}
