import passport from 'passport';
import LocalStrategy from 'passport-local';

import {
  findUserByIdOpt,
  findUserByUsername,
} from '../lib/db/queries/user.queries';

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (req, id, done) =>
  done(null, await findUserByIdOpt(id)),
);

async function verifyLogin(req, username, password, done) {
  const msgs = { user: 'User not found', pass: 'Incorrect password' };
  const user = await findUserByUsername(username.trim().toLowerCase(), true);
  if (!user) return done(null, false, { error: msgs.user });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return done(null, false, { error: msgs.pass });
  return done(null, user.toObject());
}

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'username',
      passwordField: 'password',
    },
    verifyLogin,
  ),
);

export default passport;
