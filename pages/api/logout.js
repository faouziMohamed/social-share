import nextConnect from 'next-connect';

import auth from '../../middleware';

const logoutHandler = nextConnect();

logoutHandler.use(auth).get((req, res) => {
  req.logOut();
  res.end();
});

export default logoutHandler;
