import path from 'path';
import express from 'express';
import cors from 'cors';
import {serveGraphql} from './server'
import passport from 'passport';
import { JwtStrategy } from './utils/auth/strategies/jwt.strategy';
import { GQLLocalStrategy } from './utils/auth/strategies/local-gql.strategy';

export const createApp = async() => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  passport.use(JwtStrategy);
  passport.use(GQLLocalStrategy)

  app.use('/images', express.static(path.join(__dirname, '/public')));

  app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ status: 'API is running on /api' });
  });

  await serveGraphql(app);
  return app
};
