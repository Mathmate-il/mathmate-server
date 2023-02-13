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

export enum UserErrorMessages {
  NotFound = 'One or more provided users do not exist in the users table',
}

export enum QuestionErrorMessages {
  NotFound = 'One or more provided questions do not exist in the questions table',
}

export enum BookmarkErrorMessages {
  AlreadyExists = 'The bookmark field is already exists',
}
