import Cors from 'cors';
import ms from 'ms';

import connectDB from '../lib/db/config.db';
import session from '../lib/session.lib';

export const configSession = session({
  name: 'sc-user',
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: ms('7d'),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  },
});

export const cors = () =>
  Cors({
    methods: ['GET', 'POST', 'PUT'],
    origin: true,
    credentials: true,
  });

export const headers = () => (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};

export const connectDatabase = () => connectDB((req, res, next) => next());
