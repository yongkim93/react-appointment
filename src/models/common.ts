import { ReactNode } from "react";

export type Children = {
  children: ReactNode;
};

export type DispatchNode = React.Dispatch<React.SetStateAction<React.ReactNode>>;
