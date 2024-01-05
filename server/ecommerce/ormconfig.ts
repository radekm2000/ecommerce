import { User } from 'src/utils/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import { Product } from 'src/utils/entities/product.entity';
import { Image } from 'src/utils/entities/image.entity';

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
    entities: [User, Product, Image],
    synchronize: true,
  };
}
