const validUpdateUserDto = {
  name: 'Jane Doe',
  image: 'https://example.com/jane-doe.jpg',
};

const invalidUpdateUserDto = {
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
  invalidUpdateUserDto,
  invalidUpdateUserDtoWithCreatedAt,
  invalidUpdateUserDtoWithId,
};
