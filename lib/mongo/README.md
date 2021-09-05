# mongo

```js
import {Mongo} from 'backend';

const mongo = new Mongo();
async function connect() {
	console.log('connecting to mongo');
	try {
		await mongo.buildUri({
			protocol: 'mongodb://',
			username: 'root',
			password: 'secret',
			host: 'localhost',
			port: 27017,
			database: 'mydb',
		}).connect()
		
		/**
		 * Or with a pre-built uri:
		 * await mongo.setUri(myUri).connect()
		 */ 
	} catch (err) {
		throw new Error(`connecting to mongo: ${err.message}`);
	}
}

export {mongo, connect};
```
