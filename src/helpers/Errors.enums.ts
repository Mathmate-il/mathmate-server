export enum ServerError {
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',
  Forbidden = 'Forbidden',
  NotFound = 'Not Found',
  InternalServerError = 'Internal Server Error',
  DatabaseQueryError = 'Your request is missing required data',
}

export enum UpdateErrorMessages {
  EmailNotUpdatable = 'The email field is not updatable',
  IdNotUpdatable = 'The id field is not updatable',
  CreatedAtNotUpdatable = 'The createdAt field is not updatable',
}

export enum TagErrorMessages {
  NotFound = 'One or more provided tags do not exist in the tags table',
}

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
