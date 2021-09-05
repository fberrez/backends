import {MongoMemoryServer} from 'mongodb-memory-server';

import {Mongo} from '../index.js';

let mongod;
beforeAll(async () => {
	mongod = await MongoMemoryServer.create();
});

afterAll(async () => {
	await mongod.stop();
});

test('test connection with uri', async () => {
	const mongo = new Mongo();
	await mongo.setURI(mongod.getUri()).connect();

	expect(mongo.getURI()).toBeDefined();
	expect(mongo.getConn().readyState).toBe(1);
	await mongo.getConn().close();
	expect(mongo.getConn().readyState).toBe(0);
});

test('test connection with manual entries', async () => {
	const mongo = new Mongo();
	await mongo.buildURI({
		protocol: 'mongodb://',
		host: mongod.instanceInfo.ip,
		database: mongod.instanceInfo.dbName,
	}).connect();

	expect(mongo.getURI()).toBeDefined();
	expect(mongo.getConn().readyState).toBe(1);
	await mongo.getConn().close();
	expect(mongo.getConn().readyState).toBe(0);
});

test('test unitialized connection', async () => {
	const mongo = new Mongo();
	try {
		await mongo.connect();
	} catch (e) {
		expect(e.message).toMatch('reference to undefined property \'uri\'');
		expect(e instanceof ReferenceError).toBeTruthy();
	}
});
