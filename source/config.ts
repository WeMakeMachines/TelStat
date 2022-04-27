import dotenv, { DotenvParseOutput } from "dotenv";

interface EnvironmentVariables extends DotenvParseOutput {
  MONGO_DB_HOST: string;
  MONGO_DB_NAME: string;
  MONGO_DB_USER: string;
  MONGO_DB_PASS: string;
  TELSTAT_PORT: string;
}

class ConfigError extends Error {}

class Config {
  public readonly namespace = "app.telstat";
  public readonly dbHost: string;
  public readonly dbName: string;
  public readonly dbUser: string;
  public readonly dbPass: string;
  public readonly port: number;

  constructor(props: EnvironmentVariables) {
    this.dbHost = props.MONGO_DB_HOST;
    this.dbName = props.MONGO_DB_NAME;
    this.dbUser = props.MONGO_DB_USER;
    this.dbPass = props.MONGO_DB_PASS;
    this.port = Number(props.TELSTAT_PORT);
  }
}

const { parsed } = dotenv.config();

const config = new Config(parsed as EnvironmentVariables);

export default config;
