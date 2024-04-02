import path from 'path';
import express from 'express';
import cors from 'cors';

export const createApp = async() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/images', express.static(path.join(__dirname, '/public')));

  return app
};
