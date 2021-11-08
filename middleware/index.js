import mongoSanitze from 'express-mongo-sanitize';
import helmet from 'helmet';
import nc from 'next-connect';
import xss from 'xss-clean';

import httpResponder from './httpResponder';
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
  .use(xss())
  .use(mongoSanitze())
  .use(configSession)
  .use(connectDatabase())
  .use(passport.initialize())
  .use(passport.session())
  .use(httpResponder);

export default auth;
