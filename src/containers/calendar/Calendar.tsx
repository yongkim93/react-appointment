import React, { Fragment, useState } from "react";
import "./Calendar.scss";
import { useWindowSizeManager } from "~/utility/WindowSizeManager";
import { RowHeader } from "~/components/row_header/RowHeader";
import { ColHeader } from "~/components/col_header/ColHeader";
import { Grid } from "~/components/grid/Grid";
import DragOnGrid from "~/components/drag_on_grid/DragOnGrid";
import Modal from "~/components/modal/Modal";

export function Calendar() {
  const [isActive, setIsActive] = useState<boolean>(true);
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
      <Modal
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onSubmit={() => setIsActive(false)}
      >
        <div></div>
      </Modal>
      <DragOnGrid />
    </Fragment>
  );
}
