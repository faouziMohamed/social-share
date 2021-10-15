import nextConnect from 'next-connect';

import auth from '../../middleware/authentication';

const handler = nextConnect();

handler.use(auth).get((req, res) => {
  try {
    if (!req.user) return res.json({ user: false });
    const user = readUserData(req);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'error.message' });
  }
});

function readUserData(req) {
  const { _id: id, ...userData } = req.user;
  return { ...userData, id: id?.toString() };
}

export default handler;
