import React, { Fragment, useState, useReducer, useEffect } from "react";
import "./Calendar.scss";
import { RowHeader } from "~/components/row_header/RowHeader";
import { ColHeader } from "~/components/col_header/ColHeader";
import { Grid } from "~/components/grid/Grid";
import { DragOnGrid } from "~/components/drag_on_grid/DragOnGrid";
import { Modal, useModalSR, modalSRH } from "~/components/modal/Modal";
import {
  ApptForm,
  useApptFormSR,
  apptFormSRH,
} from "~/components/appt_form/ApptForm";
import {
  useApptDiv,
  CreateApptOnGrid,
} from "~/components/create_appt_on_grid/CreateApptOnGrid";

export function Calendar() {
  const [modalState, setModalState] = useModalSR();

  const [apptFormState, setApptFormState] = useApptFormSR();

  const [apptDivState, setApptDivState] = useApptDiv();

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
      <DragOnGrid setApptDivState={setApptDivState} activateModal={() => setModalState(modalSRH.isActive(true))} />
      <CreateApptOnGrid apptDivState={apptDivState} />
    </Fragment>
  );
}
