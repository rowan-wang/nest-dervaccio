import { DataSource, DataSourceOptions } from 'typeorm';
import { getConfig } from 'src/utils/index';
import * as path from 'path';

// 设置数据库类型
const databaseType: DataSourceOptions['type'] = 'mysql';
const { MYSQL_CONFIG } = getConfig();
const entitiesPath = path.join(__dirname, `../../**/*.entity{.ts,.js}`);
console.log(entitiesPath);
const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  type: databaseType,
  entities: [entitiesPath],
};

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
