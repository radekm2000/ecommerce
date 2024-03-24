import { User } from 'src/utils/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import { Product } from 'src/utils/entities/product.entity';
import { Image } from 'src/utils/entities/image.entity';
import { Profile } from 'src/utils/entities/profile.entity';
import { Follow } from 'src/utils/entities/followers.entity';
import { Conversation } from 'src/utils/entities/conversation.entity';
import { Message } from 'src/utils/entities/message.entity';
import { Avatar } from 'src/utils/entities/avatar.entity';
import { Notification } from 'src/utils/entities/notification.entity';
import { ProductNotification } from 'src/utils/entities/product-notification.entity';
import { Review } from 'src/utils/entities/review.entity';
import { AdminNotifications } from 'src/utils/entities/adminNotifications.entity';
import { DataSource } from 'typeorm';

export let config: PostgresConnectionOptions;
if (process.env.IS_PRODUCTION == 'true') {
  config = {
    type: 'postgres',
    url: process.env.EXTERNAL_POSTGRES_DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
  };
} else {
  config = {
    type: 'postgres',
    // database: process.env.POSTGRES_DB,
    // host: 'localhost',
    url: 'postgres://ecommerce_postgresql_db_user:CDU8Anc5t3lUy8gXtrXD71l1oHuMFr0C@dpg-cnu7cr21hbls73fcag40-a.oregon-postgres.render.com/ecommerce_postgresql_db',
    ssl: {
      rejectUnauthorized: false,
    },
    // port: 5432,
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],

    synchronize: true,
  };
}
export const dataSource = new DataSource(config);
