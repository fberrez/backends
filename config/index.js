import dotenv from 'dotenv';
import convict from 'convict';

dotenv.config();
const config = convict({
  backend: {
    postgres: {
      host: {
        doc: 'The database host',
        format: '*',
        default: '127.0.0.1',
        env: 'POSTGRES_HOST',
      },
      port: {
        doc: 'The database port',
        format: 'port',
        default: 5432,
        env: 'POSTGRES_PORT',
      },
      username: {
        doc: 'The database username',
        format: String,
        default: 'postgres',
        env: 'POSTGRES_USERNAME',
      },
      password: {
        doc: 'The database password',
        format: String,
        default: 'myAwesomePassword',
        env: 'POSTGRES_PASSWORD',
      },
      database: {
        doc: 'The database name',
        format: String,
        default: 'uptime',
        env: 'POSTGRES_DATABASE',
      },
    },
  },
});

export default config.getProperties();
