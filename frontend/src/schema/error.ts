export interface CustomError extends Error {
    status?: number;
    data: {
      error: string;
    };
  }
  