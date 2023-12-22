import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export let config: PostgresConnectionOptions;
if (process.env.IS_PRODUCTION === 'true') {
  console.log('production');
} else {
  config = {
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [],
    synchronize: true,
  };
}
