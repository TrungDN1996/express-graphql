import { config } from './src/core/config';
import { createApp } from './app';

(async () => {
  const port = config.Port;
  const app = await createApp();
  app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}/graphql`);
  });
})();
