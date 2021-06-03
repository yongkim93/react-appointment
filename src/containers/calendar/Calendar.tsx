import React, { Fragment, useState, useReducer } from "react";
import "./Calendar.scss";
import { RowHeader } from "~/components/row_header/RowHeader";
import { ColHeader } from "~/components/col_header/ColHeader";
import { Grid } from "~/components/grid/Grid";
import DragOnGrid from "~/components/drag_on_grid/DragOnGrid";
import { Modal, useModalSR, modalSRH } from "~/components/modal/Modal";
import {
  ApptForm,
  useApptFormSR,
  apptFormSRH,
} from "~/components/appt_form/ApptForm";

export function Calendar() {
  const [modalState, setModalState] = useModalSR();

  const [apptFormState, setApptFormState] = useApptFormSR();

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
        isActive={modalState.isActive}
        onClose={() => setModalState(modalSRH.isActive(false))}
        onSubmit={() => {
          setModalState(modalSRH.isActive(false));
        }}
      >
        <ApptForm
          modalState={modalState}
          apptFormState={apptFormState}
          setApptFormState={setApptFormState}
          apptFormSRH={apptFormSRH}
        />
      </Modal>
      <DragOnGrid />
    </Fragment>
  );
}
