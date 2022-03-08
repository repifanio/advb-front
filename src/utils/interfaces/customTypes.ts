export type withChildren<T = {}> = T & { children?: React.ReactNode };
export type IStringMap = { [key: string]: string };
export type IElementMap = { [key: string]: JSX.Element };
export type StringToNumberMap = { [key: string]: number };

export interface Icons {
  width?: string;
  height?: string;
  color?: string;
}
export interface IAppContext {
  api: string;
  socket: string;
  theme: string;
}

export interface IModalSize {
  height: number;
  width: number;
}

export interface IClientContext {
  pro: string;
  dev: string;
  socket: string;
  theme: string;
}

export interface ISvgIconProps {
  color?: string;
  width?: number;
  height?: number;
}

export type IClient = "indications";

export type IBaseContext = "pro" | "dev";

export type IClientsContext = Record<IClient, IClientContext>;
