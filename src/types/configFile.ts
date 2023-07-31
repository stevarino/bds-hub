import typia from "typia";

export interface ConfigFile {
  /** Port for server and add on */
  port?: number,
  /** Used to override add on requested domain, otherwise `localhost:{port}` */
  host?: string,
  databaseFilename?: string,
  discord?: {
    token: string,
    app_id: string,
    /** Channel URL */
    channels: string[],
    nick?: string,
    /** discord username to xbox gamertag */
    users: {[discordUsername: string]: string},
  }
  // list of files to be included as dialogues (accepts json and yaml)
  dialogues?: string[]
};

export const assertConfigFile = typia.createAssert<ConfigFile>();
