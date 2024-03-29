import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import { DataSource } from 'typeorm';
export let config: PostgresConnectionOptions;
if (process.env.IS_DEV == 'true') {
  config = {
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: 'localhost',

    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],

    synchronize: true,
  };
} else {
  config = {
    type: 'postgres',
    url: process.env.EXTERNAL_POSTGRES_DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  };
}
export const dataSource = new DataSource(config);
