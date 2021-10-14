import nc from 'next-connect';

import auth from '../../middleware/authentication';
import passport from '../../middleware/passeport';

const loginHandler = nc();

loginHandler.use(auth).post((req, res, next) => {
  const authCallback = (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);
    return req.logIn(user, (e) => (e ? next(e) : res.json(user)));
  };

  passport.authenticate('local', authCallback)(req, res, next);
});

export default loginHandler;
