import React, { useContext, createContext, useEffect } from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import useHttp from "../dynamodb/useHTTP";
import { getDateToEpoch } from "./DateTimeManager";
import { Children } from "../models/common";
import { Event } from "../models/dynamodb";
type EventManagerState = {
  events: Map<string, object>;
};
const initialState: EventManagerState = {
  events: new Map(),
};
enum EMP_Action_Type {
  "REFRESH",
}
type EMP_Action = {
  type: EMP_Action_Type;
  payload: Map<string, object>;
};

const eventsInfo = createContext<{
  state: EventManagerState;
  dispatch: React.Dispatch<EMP_Action>;
  getState: () => EventManagerState;
  refreshEvents: () => void;
}>({
  state: initialState,
  dispatch: () => undefined,
  getState: () => initialState,
  refreshEvents: () => undefined,
});
const { Provider } = eventsInfo;

const EventManagerProvider = ({ children }: Children) => {
  const { readEvents } = useHttp();
  const [state, dispatch, getState] = useEnhancedReducer<
    EventManagerState,
    EMP_Action
  >((state, action) => {
    switch (action.type) {
      case EMP_Action_Type.REFRESH:
        return { ...state, events: action.payload };
      default:
        return state;
    }
  }, initialState);

  const refreshEvents = () => {
    readEvents("yongshine_appointment", "guest").then((data) => {
      const events = new Map();
      data?.Items?.forEach((item) => {
        const key = item.uuid;
        const startTime = getDateToEpoch(new Date(item.startTime));
        const endTime = getDateToEpoch(new Date(item.endTime));
        events.set(key, {
          ...item,
          startTimeEpochi: startTime,
          endTimeEpochi: endTime,
        });
      });
      dispatch({ type: EMP_Action_Type.REFRESH, payload: events });
    });
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <Provider value={{ state, dispatch, getState, refreshEvents }}>
      {children}
    </Provider>
  );
};

const useEventManager = () => useContext(eventsInfo);

export { useEventManager, EventManagerProvider };
