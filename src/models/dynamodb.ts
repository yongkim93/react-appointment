export type ApptInfo = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

export type Events = {
  userId: string;
  uuid: string;
  startTime: string;
  endTime: string;
  info: ApptInfo;
};

export type PutEvents = {
  tableName: string;
} & Events;
