import { Knex } from 'knex';

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'postgres',
    connection: async () => {
      return {
        host: "localhost",
        user: "alakanav",
        password: "1234",
        database: "second",
        port: 5432,
      };
    },
    debug: true,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 20,
      propagateCreateError: false,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'educate',
      user: 'postgres',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'chats',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'educate',
      user: 'username',
      password: '1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'educate',
    },
  },
};

export default configs;
