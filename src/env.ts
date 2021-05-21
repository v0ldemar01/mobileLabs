import * as dotenv from 'dotenv';
import {getOsEnv} from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  db: {
    database: getOsEnv('DATABASE'),
  },
};
