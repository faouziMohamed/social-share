import nextConnect from 'next-connect';

import auth from '../../middleware/authentication';

const logoutHandler = nextConnect();

logoutHandler.use(auth).get((req, res) => {
  req.logOut();
  res.end();
});

export default logoutHandler;
