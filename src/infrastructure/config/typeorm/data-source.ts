import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: `env/local.env` });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/infrastructure/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  synchronize: false, // Never use TRUE in production!
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
