import React, { useContext, createContext } from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import { Children } from "../models/common";
require("datejs");

enum DTP_Action_Type {
  "SET_CURRENT_DATE",
  "SET_TO_TODAY",
}
type SetCurrentDate = {
  type: DTP_Action_Type.SET_CURRENT_DATE;
  payload: Date;
};
type SetToToday = {
  type: DTP_Action_Type.SET_TO_TODAY;
};

type DTP_Action = SetCurrentDate | SetToToday;

const initialState = {
  currentDate: new Date(),
  mondayOfTheCurrentWeek: new Date().last().monday().setHours(0, 0, 0, 0),
};

const dateTimeInfo = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<DTP_Action>;
  getState: () => typeof initialState;
}>({
  state: initialState,
  dispatch: () => undefined,
  getState: () => initialState,
});

const { Provider } = dateTimeInfo;

const DateTimeProvider = ({ children }: Children) => {
  const [state, dispatch, getState] = useEnhancedReducer<typeof initialState, DTP_Action>(
    (state, action) => {
      switch (action.type) {
        case DTP_Action_Type.SET_CURRENT_DATE:
          return { ...state, currentDate: action.payload };
        case DTP_Action_Type.SET_TO_TODAY:
          return { ...state, currentDate: new Date() };
        default:
          return state;
      }
    },
    initialState
  );

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useDateTimeManager = () => useContext(dateTimeInfo);

const getDateToEpoch = (dateTime: Date) => {
  return Math.floor(dateTime.getTime() / 1000);
};

const getEpochToDate = (epoch: number) => {
  return new Date(+epoch * 1000);
};

const setCurrentDate = (date: Date): SetCurrentDate => ({
  type: DTP_Action_Type.SET_CURRENT_DATE,
  payload: date,
});

const setToToday = (): SetToToday => ({
  type: DTP_Action_Type.SET_TO_TODAY,
});

export {
  useDateTimeManager,
  DateTimeProvider,
  getDateToEpoch,
  getEpochToDate,
  setCurrentDate,
  setToToday,
};
