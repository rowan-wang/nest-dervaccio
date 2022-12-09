import { User } from './entities/user.entity';

export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: async (AppDataSource) => {
      return await AppDataSource.getRepository(User);
    },
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
