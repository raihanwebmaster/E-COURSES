/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicatedError';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //settings default values
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR as number;
  let message = 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Unauthorized! ';
    errorSources = [
      {
        path: '',
        message: "jwt malformed"
      }
    ];
  } else if (err.name == 'TokenExpiredError') {
    statusCode = 401;
    message = 'Unauthorized! ';
    errorSources = [
      {
        path: '',
        message: "Access Token was expired!"
      }
    ];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(config.NODE_ENV === 'development' && { stack: err?.stack }),
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorSources: [
  path: '',
  messagae: '',
]
stack
*/
