import express from 'express';
// eslint-disable-next-line import/extensions
import Application from './application.js';

const PORT = 5001;

const application = new Application();
application.run();

const app = express();
app.use(express.json());

app.use('/', application.getRootRouter());

const startApp = async () => {
  try {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();
