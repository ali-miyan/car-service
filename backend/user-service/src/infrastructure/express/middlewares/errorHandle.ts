import { Request, Response, NextFunction } from 'express';

export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error occurred:', err.message); // Log the error for debugging

  let statusCode = 500;
  let errorMessage = 'Internal Server Error';

  if (err instanceof Error) {
    statusCode = 400;
    errorMessage = err.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};
