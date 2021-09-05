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
	mongo.buildURI({
		protocol: 'mongodb://',
		host: 'localhost:27017',
		username: 'myuser',
		password: 'mysecret',
		database: 'mydb',
	});

	expect(mongo.getURI()).toMatch('mongodb://myuser:mysecret@localhost:27017/mydb');
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
