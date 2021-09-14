import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import CompositionRoot from './root/composition.js';

dotenv.config();

const root = new CompositionRoot();
root.startup();
