import React, { useReducer } from "react";
import { Children } from "~/models/common";
import { createPortal } from "react-dom";

type ModalState = {
  isActive: boolean;
  isUpdated: boolean;
  isSubmitted: boolean;
};

const initialModalState: ModalState = {
  isActive: true,
  isUpdated: false,
  isSubmitted: false,
};

enum MSR_Action_Type {
  "SET_IS_ACTIVE",
  "SET_IS_UPDATED",
  "SET_IS_SUBMITTED",
  "RESET",
}

type MSR_Action = {
  type: MSR_Action_Type;
  payload: boolean;
};

const modalStateReducer = (
  state: ModalState,
  action: MSR_Action
): ModalState => {
  switch (action.type) {
    case MSR_Action_Type.SET_IS_ACTIVE:
      return { ...state, isActive: action.payload };
    case MSR_Action_Type.SET_IS_UPDATED:
      return { ...state, isUpdated: action.payload };
    case MSR_Action_Type.SET_IS_SUBMITTED:
      return { ...state, isSubmitted: action.payload };
    case MSR_Action_Type.RESET:
      return { ...initialModalState };
    default:
      throw new Error("No action type");
  }
};

const useModalStateReducer = () =>
  useReducer(modalStateReducer, initialModalState);

const modalStateReducerHelpers = {
  isActive: (bool: boolean): MSR_Action => ({
    type: MSR_Action_Type.SET_IS_ACTIVE,
    payload: bool,
  }),
  isUpdated: (bool: boolean): MSR_Action => ({
    type: MSR_Action_Type.SET_IS_UPDATED,
    payload: bool,
  }),
  isSubmitted: (bool: boolean): MSR_Action => ({
    type: MSR_Action_Type.SET_IS_SUBMITTED,
    payload: bool,
  }),
};

type Props = {
  isActive: boolean;
  onClose: () => void;
  onSubmit: () => void;
} & Children;

const Modal = (props: Props) => {
  return createPortal(
    <div className={`modal ${props.isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Appointment</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.onClose}
          ></button>
        </header>
        <section className="modal-card-body is-clipped">
          {props.children}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={props.onSubmit}>
            Submit
          </button>
          <button className="button" onClick={props.onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById("root") as HTMLElement
  );
};

export {
  Modal,
  useModalStateReducer as useModalSR,
  modalStateReducerHelpers as modalSRH,
  ModalState,
};
