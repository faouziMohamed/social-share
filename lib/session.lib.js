import { parse, serialize } from 'cookie';

import { createLoginSession, getLoginSession } from './auth.lib';

function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export default function session({ name, secret, cookie: cookieOpts }) {
  return async (req, res, next) => {
    const unsealed = await unsealCookie(req, name, secret, res);
    req.session = unsealed;
    // We are proxying res.end to commit the session cookie
    const oldEnd = res.end;
    res.end = async function resEndProxy(...args) {
      if (res.finished || res.writableEnded || res.headersSent) return;
      if (cookieOpts.maxAge) req.session.maxAge = cookieOpts.maxAge;
      const newToken = await createLoginSession(req.session, secret);
      res.setHeader('Set-Cookie', serialize(name, newToken, cookieOpts));
      oldEnd.apply(this, args);
    };
    next();
  };
}

async function unsealCookie(req, name, secret, res) {
  const cookies = parseCookies(req);
  const token = cookies[name];
  let unsealed = {};

  if (token) {
    try {
      unsealed = await getLoginSession(token, secret);
    } catch (e) {
      // If the token is invalid, we should remove it from the cookie.
      res.setHeader(
        'Set-Cookie',
        serialize(name, '', { expires: new Date(0) }),
      );
      res.status(401).json({ error: e.message });
    }
  }
  return unsealed;
}
