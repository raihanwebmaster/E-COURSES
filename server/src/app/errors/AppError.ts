class AppError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;

// THE SUPER() METHOD IS USED TO CALL THE CONSTRUCTOR OF THE PARENT CLASS (ERROR IN THIS CASE) . IT PASSES THE MESSAGE  ARGUMENT TO THE ERROR CLASS CONSTRUCTOR, WHICH  SETS THE ERROR MESSAGE FOR THE INSTANCE
