import express from 'express';
import router from './routers/router.js';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use('/api', router);

const startApp = async () => {
  try {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startApp();