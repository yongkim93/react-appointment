export type ApptInfo = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

export type Event = {
  userId: string;
  uuid: string;
  startTime: string;
  endTime: string;
  info: ApptInfo;
};

export type PutEvents = {
  tableName: string;
} & Event;
