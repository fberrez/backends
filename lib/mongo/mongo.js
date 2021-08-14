const mongoose = require('mongoose');

// maps regrouping listened events
const EVENTS = {
  OPEN: 'open',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
  CLOSE: 'close',
  RECONNECTED: 'reconnected',
  RECONNECTED_FAILED: 'reconnectedFailed',
};

/**
 * logs the event
 * @param {string} name connection name
 * @param {string} event event to log
 * @param {logger} logger logger to use to log the event
 */
function logEvent(logger, name, event) {
  logger(`[${name}] event ${event} occured`);
}

class Mongo {
  /**
   * @constructor
   * @param {string} name database name
   * @param {object} options connection options
   * @param {object} logger logger to use
   */
  // eslint-disable-next-line no-console
  constructor(name, options, logger = console.log) {
    this.options = options;
    this.conn = mongoose.createConnection();
    this.logger = logger;
    Object.values(EVENTS).forEach((e) => {
      this.conn.on(e, () => logEvent(this.logger, this.conn.name, e));
    });
  }

  /**
   * builds the uri with the given arguments and performs the connection
   * @param {object} param0 uri params
   * @param {string} param0.protocol host protocol (ex: "mongodb://")
   * @param {string} param0.username username to use to connect to the db
   * @param {string} param0.password password to use to connect to the db
   * @param {string} param0.host db host
   * @param {string} param0.port db port
   * @param {string} param0.database db name
   */
  async useExternal({ protocol, username, password, host, port, database }) {
    this.uri = `${protocol}${username}:${password}@${host}:${port}/${database}`;
    try {
      await this.conn.openUri(this.uri, this.options);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }

    return this;
  }

  /**
   * returns the connection instance
   * @returns
   */
  getConn() {
    return this.conn;
  }

  /**
   * getURI returns the mongo uri
   * @returns {string}
   */
  getURI() {
    return this.uri;
  }

  /**
   * close closes the connection
   * @returns {promise}
   */
  async close() {
    if (this.conn === undefined) {
      throw new Error('mongo: connection not established');
    }

    return this.conn.close();
  }
}

module.exports = Mongo;
