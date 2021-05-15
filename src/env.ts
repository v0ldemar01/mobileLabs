import * as dotenv from 'dotenv';
import {getOsEnv} from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  db: {
    driver: require('expo-sqlite'),
    database: getOsEnv('TYPEORM_DATABASE'),
    type: getOsEnv('TYPEORM_CONNECTION'),
    logging: getOsEnv('TYPEORM_LOGGING'),
    migrationsRun: getOsEnv('TYPEORM_MIGRATIONS_RUN'),
    synchronize: getOsEnv('TYPEORM_SYNCHRONIZE'),
    entities: [getOsEnv('TYPEORM_ENTITIES')],
    migrations: [getOsEnv('TYPEORM_MIGRATIONS')],
    cli: {
      migrationsDir: getOsEnv('TYPEORM_MIGRATIONS_DIR'),
    },
  },
};
