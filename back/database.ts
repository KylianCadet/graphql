import knex from "knex";
import { DB_NAME } from "./const";

const db = knex<string>({
  client: 'sqlite3',
  connection: {
    filename: DB_NAME,
  },
  useNullAsDefault: true
});

export { db }