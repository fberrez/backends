const postgres = require('postgres');

class Postgres {
  /**
   * builds the uri with the given arguments and performs the connection
   * @param {object} param0 uri params
   *  @param {string} param0.host db host
   * @param {string} param0.port db port
   * @param {string} param0.username username to use to connect to the db
   * @param {string} param0.password password to use to connect to the db
   * @param {string} param0.database db name
   */
  constructor({ host, port, username, password, database }) {
    this.sql = postgres(`postgres://${username}:${password}@${host}:${port}/${database}`);
  }

  /**
   * select is used to execute a select query on targeted table and columns.
   * @param {String} table string representing the name of the table to interact with
   * @param {String[]} columns array of string representing the columns to return
   */
  async select(table, columns) {
    await this.sql`select ${this.sql(columns)} from ${this.sql(table)}`;
  }
}

module.exports = Postgres;
