import { isValidObjectId } from 'mongoose';
import nextConnect from 'next-connect';

import {
  existsUserById,
  existsUserByUsername,
  findUserByIdOpt,
  findUserByUsernameOpt,
} from '../../../lib/db/queries/user.queries';
import AppError from '../../../lib/errors/sc-error-base';
import UserError from '../../../lib/errors/user-error';
import auth from '../../../middleware/authentication';

const handler = nextConnect();

handler.use(auth).get(async (req, res) => {
  try {
    const { username } = req.query;
    let user;
    if (isValidObjectId(username)) {
      const uid = username;
      if (!(await existsUserById(username))) {
        const message = 'Please provide a valid user id or use a username';
        const hint = `The value likely user user id '${uid}' is invalid`;
        throw new UserError({ message, hint, code: 400 });
      }
      user = await findUserByIdOpt(uid);
    } else {
      if (!(await existsUserByUsername(username))) {
        const message = 'Please provide a valid username or use a user Id';
        const hint = `The username you passed '${username}' does not belong to anyone`;
        throw new UserError({ message, hint, code: 400 });
      }
      user = await findUserByUsernameOpt(username);
    }
    const { _id: id, ...userData } = user;
    return res.json({ user: { id, ...userData } });
  } catch (e) {
    return handleErrors(e, res);
  }
});

export default handler;

export function handleErrors(e, res) {
  let error = e;
  if (!(e instanceof AppError)) {
    error = new UserError({
      message: 'Bad request, verify your params and retry later',
      code: 400,
    });
    // eslint-disable-next-line no-console
    console.log('Error', e.stack);
  }
  res.status(error.statusCode).json(error.toResponse());
}
