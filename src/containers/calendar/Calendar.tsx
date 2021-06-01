import React, { Fragment } from "react";
import "./Calendar.scss";
import { useWindowSizeManager } from "~/utility/WindowSizeManager";
import { RowHeader } from "~/components/row_header/RowHeader";
import { ColHeader } from "~/components/col_header/ColHeader";
import { Grid } from "~/components/grid/Grid";
import DragOnGrid from "~/components/drag_on_grid/DragOnGrid";

export function Calendar() {
  return (
    <Fragment>
      <div className="column-align">
        <ColHeader />
        <div className="row-align">
          <RowHeader />
          <div className="vertical_grid" id="vertical_grid">
            <Grid />
          </div>
        </div>
      </div>
      <DragOnGrid />
    </Fragment>
  );
}
