import React from "react";
import "./Calendar.scss";
import { useWindowSizeManager } from "../../utility/WindowSizeManager";
import { RowHeader } from "../../components/row_header/RowHeader";
import { ColHeader } from "../../components/col_header/ColHeader";
import { Grid } from "~/components/grid/Grid";
export function Calendar() {
  return (
    <div className="column-align">
      <ColHeader />
      <div className="row-align">
        <RowHeader />
        <div className="vertical_grid" id="vertical_grid">
          <Grid />
        </div>
      </div>
    </div>
  );
}
