/* eslint-disable import/extensions */
import { decorate, inject, injectable } from 'inversify';
import express from 'express';

import cors from 'cors';
import mongoose from 'mongoose';
import TYPES from '../constants/types.js';
import errorMiddleware from '../middleware/error.js';

class Application {
  constructor(rootRouter) {
    this.rootRouter = rootRouter;
  }

  async bootstrap() {
    try {
      this.server = express();
      this.server.use(express.json());
      this.server.use(cors());

      this.server.use('/', this.rootRouter.getRouter());
      this.server.use(errorMiddleware);

      await mongoose.connect(`${process.env.DB_HOST}`);
      this.server.listen(process.env.PORT, () => console.log(`Listening on port: ${process.env.PORT}`));
    } catch (error) {
      console.log(error);
    }
  }
}

decorate(injectable(), Application);
decorate(inject(TYPES.RootRouter), Application, 0);

export default Application;
