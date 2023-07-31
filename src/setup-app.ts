import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setupApp = async (app: INestApplication) => {
  app.use(
    cookieSession({
      keys: [process.env.COOKIE_KEY],
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
};
