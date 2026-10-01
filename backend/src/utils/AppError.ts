
export class AppError extends Error {
  // public → class ke bahar bhi access allowed
  // private   → sirf class ke andar
  // protected → class + child classes ke andar
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    // Call the parent Error constructor
    // so that Error class can set the error.message property
    super(message);
    this.statusCode = statusCode;

    // 4xx errors → "fail" (client-side errors)
    // 5xx errors → "error" (server-side errors)

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Mark this as a known/expected application error
    // that can be safely handled by the global error handler
    this.isOperational = true;
    
    // Stack trace = error kaha hua aur waha tak code kaise pahucha, uski list.
    // Capture the stack trace and attach it to the current AppError object,
    // so we can see where the error occurred,
    // while excluding the AppError constructor itself from the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
