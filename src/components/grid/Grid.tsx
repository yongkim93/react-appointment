import React, { Fragment } from "react";
import Col from "./Col"
import Row from "./Row"

export function Grid() {
  return (
    <Fragment>
      <div className="horizontal_grid" id="horizontal_grid">
        <Row />
      </div>
      <Col />
    </Fragment>
  );
}
