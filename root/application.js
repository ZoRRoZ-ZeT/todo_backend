import { decorate, inject, injectable } from 'inversify';
import express from 'express';
// eslint-disable-next-line import/extensions
import TYPES from '../constants/types.js';
import errorMiddleware from '../middleware/error.js';
import cors from 'cors';
import configuration from './config.js';
import mongoose from 'mongoose';

class Application {
  constructor(rootRouter) {
    this.rootRouter = rootRouter;
  }

  bootstrap() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(cors());

    this.server.use('/', this.rootRouter.getRouter());
    this.server.use(errorMiddleware);
    
    const startApp = async () => {
      try {
        await mongoose.connect(configuration.DB_URL);
        this.server.listen(configuration.PORT, () => console.log(`Listening on port: ${configuration.PORT}`));
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
