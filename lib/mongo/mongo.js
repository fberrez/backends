import mongoose from 'mongoose';

// Maps regrouping listened events
const EVENTS = new Map([
	['OPEN', {event: 'connected', level: 'log'}],
	['DISCONNECTED', {event: 'disconnected', level: 'log'}],
	['ERROR', {event: 'error', level: 'error'}],
	['CLOSE', {event: 'close', level: 'log'}],
	['RECONNECTED', {event: 'reconnected', level: 'log'}],
	['RECONNECTED_FAILED', {event: 'reconnectedFailed', level: 'error'}],
]);

/**
 * Logs the event
 * @param {string} name connection name
 * @param {string} event event to log
 * @param {logger} logger logger to use to log the event
 */
function logEvent(logger, name, event, err) {
	logger(`[${name}] event '${event}' occured ${err ? `: ${err.message}` : ''}`);
}

class Mongo {
	/**
   * @constructor
   * @param {object} options connection options
   * @param {object} logger logger to use
   */
	// eslint-disable-next-line no-console
	constructor(options, logger = console) {
		this.options = options;
		this.logger = logger;
	}

	/**
   * Performs the connection
   */
	async connect() {
		if (this.uri === undefined) {
			throw new ReferenceError('reference to undefined property \'uri\'');
		}

		try {
			this.conn = await mongoose.createConnection(this.uri, this.options);
			EVENTS.forEach(e => {
				this.conn.on(e.event, err => logEvent(this.logger[e.level], this.conn.name, e.event, err));
			});
			await this.conn.asPromise();
		} catch (err) {
			this.logger.error(err);
			throw err;
		}

		return this;
	}

	/**
	 * Builds a mongo uri with the given params
	 * @param {object} param0 uri params
   * @param {string} param0.protocol host protocol (ex: "mongodb://")
   * @param {string} param0.username username to use to connect to the db (optional)
   * @param {string} param0.password password to use to connect to the db (optional)
   * @param {string} param0.host db host
   * @param {string} param0.database db name
	 * @returns
	 */
	buildURI({protocol, username, password, host, database}) {
		let userInfo = '';
		if (username !== undefined && password !== undefined) {
			userInfo = `${username}:${password}@`;
		}

		return this.setURI(`${protocol}${userInfo}${host}/${database}`);
	}

	/**
	 * Sets the given string as uri
	 * @param {string} uri mongo uri
	 * @returns
	 */
	setURI(uri) {
		this.uri = uri;
		return this;
	}

	/**
   * Returns the connection instance
   * @returns
   */
	getConn() {
		return this.conn;
	}

	/**
   * Returns the mongo uri
   * @returns {string}
   */
	getURI() {
		return this.uri;
	}

	/**
   * Closes the connection
   * @returns {promise}
   */
	async close() {
		if (this.conn === undefined) {
			throw new Error('connection not established');
		}

		return this.conn.close();
	}
}

export {Mongo};
