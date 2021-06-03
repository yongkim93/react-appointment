import React, { Dispatch, useReducer, FormEvent } from "react";
import { ModalState } from "../modal/Modal";

type InputProps = {
  value: string;
  initial: boolean;
  isValid: boolean;
};

type ApptFormState = {
  name: InputProps;
  email: InputProps;
  purpose: InputProps;
  message: InputProps;
};

const initialFormState: ApptFormState = {
  name: { value: "yong", initial: true, isValid: false },
  email: { value: "yong4@hawaii.edu", initial: true, isValid: false },
  purpose: { value: "Study", initial: true, isValid: false },
  message: { value: "text", initial: true, isValid: false },
};

enum AFSR_Action_Types {
  "SET_NAME",
  "SET_EMAIL",
  "SET_PURPOSE",
  "SET_MESSAGE",
  "RESET",
}

type AFSR_Action = {
  type: AFSR_Action_Types;
  payload: string;
};

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const apptFormStateReducer = (
  state: ApptFormState,
  action: AFSR_Action
): ApptFormState => {
  switch (action.type) {
    case AFSR_Action_Types.SET_NAME:
      return {
        ...state,
        name: {
          value: action.payload,
          initial: !action.payload,
          isValid: action.payload.trim() === "" ? false : true,
        },
      };
    case AFSR_Action_Types.SET_EMAIL:
      return {
        ...state,
        email: {
          value: action.payload,
          initial: !action.payload,
          isValid: validateEmail(action.payload),
        },
      };
    case AFSR_Action_Types.SET_PURPOSE:
      return {
        ...state,
        purpose: {
          value: action.payload,
          initial: !action.payload,
          isValid: action.payload.trim() === "" ? false : true,
        },
      };
    case AFSR_Action_Types.SET_MESSAGE:
      return {
        ...state,
        message: {
          value: action.payload,
          initial: !action.payload,
          isValid: action.payload.trim() === "" ? false : true,
        },
      };
    case AFSR_Action_Types.RESET:
      return { ...initialFormState };
    default:
      throw new Error("No action type");
  }
};

const useApptFormStateReducer = () =>
  useReducer(apptFormStateReducer, initialFormState);

const apptFormStateReducerHelpers = {
  name: (name: string): AFSR_Action => ({
    type: AFSR_Action_Types.SET_NAME,
    payload: name,
  }),
  email: (email: string): AFSR_Action => ({
    type: AFSR_Action_Types.SET_EMAIL,
    payload: email,
  }),
  purpose: (purpose: string): AFSR_Action => ({
    type: AFSR_Action_Types.SET_PURPOSE,
    payload: purpose,
  }),
  message: (message: string): AFSR_Action => ({
    type: AFSR_Action_Types.SET_MESSAGE,
    payload: message,
  }),
  reset: (): AFSR_Action => ({ type: AFSR_Action_Types.RESET, payload: "" }),
};

type Props = {
  modalState: ModalState;
  apptFormState: ApptFormState;
  setApptFormState: Dispatch<AFSR_Action>;
  apptFormSRH: typeof apptFormStateReducerHelpers;
};

const ApptForm = ({
  modalState,
  apptFormState,
  setApptFormState,
  apptFormSRH,
}: Props) => {
  const { name, email, purpose, message } = apptFormState;

  const nameHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setApptFormState(apptFormSRH.name(e.currentTarget.value));
  };

  const emailHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setApptFormState(apptFormSRH.email(e.currentTarget.value));
  };

  const purposeHandler = (e: FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setApptFormState(apptFormSRH.purpose(e.currentTarget.value));
  };

  const messageHandler = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setApptFormState(apptFormSRH.message(e.currentTarget.value));
  };

  return (
    <div className="Form text-left">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            disabled={modalState.isSubmitted}
            className={`input ${name.initial && !name.isValid && "is-danger"} ${
              !name.initial && name.isValid && "is-success"
            }`}
            type="text"
            placeholder="Your Name"
            value={name.value}
            onChange={nameHandler}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-right">
          <input
            disabled
            className="input is-disable"
            type="text"
            placeholder="Text input"
            value="guest"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-right">
          <input
            disabled={modalState.isSubmitted}
            className={`input ${!email.isValid && "is-danger"} ${
              email.isValid && "is-success"
            }`}
            type="email"
            placeholder="my-email@example.com"
            value={email.value}
            onChange={emailHandler}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              disabled={modalState.isSubmitted}
              value={purpose.value}
              onChange={purposeHandler}
            >
              <option value="Hang Out">Hang Out</option>
              <option value="Study">Study</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            disabled={modalState.isSubmitted}
            className={`textarea ${
              message.initial && !message.isValid && "is-danger"
            } ${!message.initial && message.isValid && "is-success"}`}
            placeholder="Please leave a message!"
            value={message.value}
            onChange={messageHandler}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export {
  ApptForm,
  useApptFormStateReducer as useApptFormSR,
  apptFormStateReducerHelpers as apptFormSRH,
};
