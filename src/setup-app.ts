import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export const setupApp = async (app: INestApplication) => {
  app.use(
    cookieSession({
      keys: ['random'],
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
};
