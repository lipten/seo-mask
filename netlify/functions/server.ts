// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
require('module-alias/register');
import app from '../../example/scripts/app'
import serverless from 'serverless-http';

// const api = express();

// const router = Router();
// router.get('', (req, res) => res.send('index'));
// router.get('/hello', (req, res) => res.send('Hello World!'));

// api.use('/', router);

export const handler = serverless(app);
