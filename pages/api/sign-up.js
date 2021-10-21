import nc from 'next-connect';

import connectDB from '../../lib/db/config.db';
import User from '../../lib/db/models/user.model';
import { createUser } from '../../lib/db/queries/user.queries';

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;
    if (!username || !password || !firstname || !lastname) {
      throw new Error('Please fill out the registration form');
    }
    const uLc = username.trim().toLowerCase();
    const existsUser = await User.exists({ username: uLc });
    if (existsUser) throw new Error('User already exists');
    const data = { firstname, lastname, username, password };
    await createUser(data);

    res.status(201).json({ data: 'User created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default connectDB(handler);
