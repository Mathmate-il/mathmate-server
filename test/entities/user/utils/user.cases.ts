const validUpdateUserDto = {
  name: 'Jane Doe',
  image: 'https://example.com/jane-doe.jpg',
};

const invalidUpdateUserDtoWithEmail = {
  email: 'jane-doe@example.com',
};

const invalidUpdateUserDtoWithId = {
  id: '123456789',
};

const invalidUpdateUserDtoWithCreatedAt = {
  createdAt: new Date(),
};

export {
  validUpdateUserDto,
  invalidUpdateUserDtoWithEmail,
  invalidUpdateUserDtoWithCreatedAt,
  invalidUpdateUserDtoWithId,
};
