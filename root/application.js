import { decorate, inject, injectable } from 'inversify';
import express from 'express';
// eslint-disable-next-line import/extensions
import TYPES from '../../constants/types.js';
import errorMiddleware from '../../middleware/error.js';

class Application {
  constructor(rootRouter) {
    this.rootRouter = rootRouter;
  }

  bootstrap() {
    this.PORT = 5000;

    this.server = express();
    this.server.use(express.json());

    this.server.use('/', this.rootRouter.getRouter());
    this.server.use(errorMiddleware);

    const startApp = async () => {
      try {
        this.server.listen(this.PORT, () => console.log(`Listening on port: ${this.PORT}`));
      } catch (e) {
        console.log(e);
      }
    };

    startApp();
  }
}

decorate(injectable(), Application);
decorate(inject(TYPES.RootRouter), Application, 0);

export default Application;
