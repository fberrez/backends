# mongo

```js
// index.js
const { Mongo } = require('backend');

const mongo = new Mongo('myDB', logger);
(async function () {
  await mongo.useExternal({
    protocol: 'mongodb://',
    username: 'myUser',
    password: 'mySecret',
    host: 'localhost',
    port: 27017,
    database: 'myDB',
  });
})();

module.exports = mongo;
```
