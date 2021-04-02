import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';

import routes from './routes';

const app = express();

// add middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// add routes
routes(app);

export { app };
