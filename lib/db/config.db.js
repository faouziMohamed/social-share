/* eslint-disable no-console */
import chalk from 'chalk';
import { connect, connections } from 'mongoose';

export default function connectDB(handler) {
  return async (req, res, next) => {
    if (connections[0].readyState) return handler(req, res, next);
    await initiateDbConnexion();
    return handler(req, res, next);
  };
}

export async function initiateDbConnexion() {
  const DEV_DB_URI = 'mongodb://localhost:27017/social-share';
  const DB_URI = process.env.DB_URI || DEV_DB_URI;
  try {
    await connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connected = chalk.yellowBright('MongoDB Connection established');
    const { host, port, name } = connections[0];
    const conString = chalk.bold(`${host}:${port}/${name}`);
    console.log();
    console.log('>', `${connected} on ${conString}`);
    console.log();
  } catch (err) {
    console.log('>', chalk.red(`MongoDB Connection error `, err));
  }
}
