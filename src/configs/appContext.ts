import { client, base } from "./app.json";
import { IAppContext, IClientsContext, IBaseContext, IClient } from "~/utils";

const clients: IClientsContext = {
  indications: {
    pro: "http://54.86.179.55:3001",
    dev: "http://localhost:3001",
    socket: "http://localhost:3000",
    theme: "indications",
  },
};

const defineContext = (client: IClient, base: IBaseContext): IAppContext => {
    return {
    api: clients[client][base],
    socket: clients[client].socket,
    theme: clients[client].theme,
  };
};

export const appContext = defineContext(
  client as IClient,
  base as IBaseContext
);
