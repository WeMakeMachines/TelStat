import dotenv from "dotenv";

dotenv.config();

export default class Config {
  public static readonly namespace = "app.telstat";
  public static readonly db_host = process.env.TELSTAT_DB_HOST;
  public static readonly db_name = process.env.TELSTAT_DB_NAME;
  public static readonly db_user = process.env.TELSTAT_DB_USER;
  public static readonly db_pass = process.env.TELSTAT_DB_PASS;
  public static readonly port = process.env.TELSTAT_PORT;
}
