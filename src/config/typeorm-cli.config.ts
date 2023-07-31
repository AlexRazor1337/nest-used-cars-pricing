import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config({
  path: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  logging: configService.get<boolean>('DB_LOGGING'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
