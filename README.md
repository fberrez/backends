# backends

`backends` is a simple node package used to create instances with databases, caches and message brokers in nodejs.

It uses a "singleton" pattern (i.e a single instance by backend) to create all connections.

## postgres

- required config:

```txt
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

- usage:

```js
import postgres from 'backends';

try {
  const accounts = postgres.select('account', ['email', 'firstname']);
  console.log(JSON.stringify(accounts, null, 2));
} catch(err) {
  ...
}
```
