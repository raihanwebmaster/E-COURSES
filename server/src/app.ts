/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './app/config';
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
  res.status(200).json({
    success: true,
    message: 'API IS WORKING',
  });
});

//unkown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

export default app;
