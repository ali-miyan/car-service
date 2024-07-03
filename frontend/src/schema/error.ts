export interface CustomError extends Error {
    status?: number | string;
    data: {
      error: string;
    };
  }
  