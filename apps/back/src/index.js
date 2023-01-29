import express from 'express';

import serviceExpress from './services/express';
import * as db from './services/mongodb';
import configs from './configs';
import { initS3rver } from './services/s3rver';
import { connectOpenai } from '../../../libs/openai';

require('esm');

const app = express();

serviceExpress(app);

let retry = 1;
async function start() {
  try {
    console.log('Establishing connexion with database...');
    await db.connect();
    await initS3rver();
    console.log(`Welcome on app, port: ${configs.port}`);

    await connectOpenai(
      process.env.OPENAI_API_KEY || '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',
    );
  } catch (err) {
    console.log(err);

    if (retry >= 3) {
      console.log('Max retry');
      process.exit(1);
    } else {
      console.log('Retry ...');
      setTimeout(start, 3000);
      retry += 1;
    }
  }
}

process.on('uncaughtException', (err) => {
  console.debug('Uncaught exception');
  console.error(err);
});

app.listen(configs.port, start);
