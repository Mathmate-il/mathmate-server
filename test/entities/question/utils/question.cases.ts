const validCreateQuestionDto = {
  title: 'numbers',
  question: 'how did numbers were created?',
  tags: [
    { id: 'bd719172-5d63-469d-8a76-00be6d6a2852' },
    { id: 'dbe75c19-ba21-423e-83d4-39718368eeff' },
  ],
};

const inValidCreateQuestionDto = {
  title: '321',
  question: 'how',
  tags: ['132', '321'],
};

const validTags = {
  tags: [
    { id: 'bd719172-5d63-469d-8a76-00be6d6a2852' },
    { id: 'dbe75c19-ba21-423e-83d4-39718368eeff' },
  ],
};

const inValidTags = {
  tags: [
    { id: 'bd719172-5d63-469d-8a76-32173872183781237' },
    { id: 'dbe75c19-ba21-423e-83d4-324214213d2331321' },
  ],
};

const inValidOwnerId = {
  id: '966ebaee-2c67-4fa6-93fc-39201973821738',
};

export {
  validCreateQuestionDto,
  inValidCreateQuestionDto,
  validTags,
  inValidTags,
  inValidOwnerId,
};
