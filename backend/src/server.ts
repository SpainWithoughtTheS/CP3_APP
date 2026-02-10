import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes/index.js';
import { env } from './config/env.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api', apiRouter);

app.listen(env.port, () => {
  console.log(`CampusConnect API listening on http://localhost:${env.port}`);
});
