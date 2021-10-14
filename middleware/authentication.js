import nc from 'next-connect';

import connectDB from '../lib/db/config.db';
import session from '../lib/session.lib';
import passport from './passeport';

export const configSession = session({
  name: 'sc-user',
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  },
});

const auth = nc()
  .use(configSession)
  .use(connectDB((req, res, next) => next()))
  .use(passport.initialize())
  .use(passport.session());

export default auth;
