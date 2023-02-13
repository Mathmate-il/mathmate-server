const validCreateQuestionDto = {
  title: 'numbers',
  question: 'how did numbers were created?',
  tags: [{ id: '' }, { id: '' }],
};

const inValidCreateQuestionDto = {
  title: '321',
  question: 'how',
  tags: ['132', '321'],
};

const validTagsDto = {
  tags: [{ id: '' }, { id: '' }],
};

const inValidTagsDto = {
  tags: [
    { id: 'bd719172-5d63-469d-8a76-32173872183781237' },
    { id: 'dbe75c19-ba21-423e-83d4-324214213d2331321' },
  ],
};

const validOwnerIdDto: { id: string } = {
  id: '',
};

const inValidOwnerIdDto = {
  id: '966ebaee-2c67-4fa6-93fc-39201973821738',
};

export {
  inValidCreateQuestionDto,
  validCreateQuestionDto,
  validTagsDto,
  inValidTagsDto,
  validOwnerIdDto,
  inValidOwnerIdDto,
};
