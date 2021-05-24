import postgres from 'postgres';
import config from '../../config/index.js';

class Postgres {
  constructor(host, port, username, password, database) {
    this.sql = postgres(`postgres://${username}:${password}@${host}:${port}/${database}`);
  }

  /**
   * select is used to execute a select query on targeted table and columns.
   * @param {String} table string representing the name of the table to interact with
   * @param {String[]} columns array of string representing the columns to return
   * @returns {Promise} auery as a promise 
   */
  async select(table, columns) {
    console.log(table, columns);
    return await this.sql`select ${this.sql(columns)} from ${this.sql(table)}`;
  }
}

let conn;
const { backend: { postgres: postgresConfig } } = config;
conn = new Postgres(postgresConfig.host, postgresConfig.port, postgresConfig.username, postgresConfig.password, postgresConfig.database);

export default conn;
