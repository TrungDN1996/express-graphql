import express, { Express } from 'express';
import cors from 'cors';

export const createApp = async() => {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  return app
};
