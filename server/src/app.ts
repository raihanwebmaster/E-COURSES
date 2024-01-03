/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './app/config';
import globalErrorHandler from './app/middleware/globalHandler';
import notFound from './app/middleware/notFound';
import httpStatus from 'http-status';
const app = express();

//body parser
app.use(express.json({ limit: '50mb' }));

//cookies parser
app.use(cookieParser());

//cors => cross origin resource sharing
app.use(
  cors({
    origin: config.origin,
  }),
);

//testing api
app.get('/test', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'API IS WORKING',
  });
});

//golobal Error handler
app.use(globalErrorHandler);

//unkown route
app.all('*', notFound);

export default app;
