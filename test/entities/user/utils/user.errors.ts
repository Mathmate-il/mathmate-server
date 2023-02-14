export const UserInvalidJwtError = { statusCode: 401, message: 'Unauthorized' };

export const UserInvalidNotUpdatableDateError = {
  error: 'Bad Request',
  message: [
    'The createdAt field is not updatable',
    'createdAt must be a Date instance',
  ],
  statusCode: 400,
};

export const UserInvalidNotUpdatableIdError = {
  error: 'Bad Request',
  message: ['The id field is not updatable'],
  statusCode: 400,
};

export const UserInvalidNotUpdatableEmailError = {
  error: 'Bad Request',
  message: ['The email field is not updatable'],
  statusCode: 400,
};
