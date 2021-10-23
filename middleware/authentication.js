import helmet from 'helmet';
import nc from 'next-connect';

import {
  configSession,
  connectDatabase,
  cors,
  headers,
} from './init-middleware';
import passport from './passeport';

const auth = nc()
  .use(cors())
  .use(headers())
  .use(helmet())
  .use(configSession)
  .use(connectDatabase())
  .use(passport.initialize())
  .use(passport.session());

export default auth;
