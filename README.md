# Mathmate

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![node](https://img.shields.io/badge/node-16.13.1-green)
![npm](https://img.shields.io/badge/npm-8.1.2-green)
![PRs](https://img.shields.io/badge/PRs-Welcome-green)

## Vision

**Join us on a journey to revolutionize math education, where we use the combined strengths of community and collaboration to make math not just accessible, but practical and yes, even enjoyable!**

## Table of contents

1. [Timeline](#timeline)
2. [Run locally](#run-locally)
3. [Contributors](#contributors)

## Timeline <a name='timeline' />

**Phase 1: // Expected timeline: Year 1**

- A community-driven forum where anyone can ask math-related questions using a user-friendly interface.
- Implementing a tagging system for data collection for future use.

**Phase 2: // Expected timeline: Year 2**

- Incorporating a scoring and badge system to enhance reliability based on collected data.
- Expanding our math subjects to more advanced topics such as Geometry, graphs, etc.

  **Phase 3: // Expected timeline: Year 2.5**

- A data-driven approach to filtering and querying questions and providing smart suggestions.

  **Phase 4: // Expected timeline: Year 4**

- Allowing selected users (based on data) to create challenging math problems with pre-defined solutions, similar to LeetCode.
- Integrating a math calculator with LaTex support.

  **Phase 5: // Expected timeline: At least Year 6**

- Incorporating a proof-assistant tool.

  **Phase 6: // Expected timeline: At least Year 8**

- The ultimate goal: MathmateNLP.

## Tech Stack

Node, TypeScript, Prisma, Docker, Jest, PostgreSQL.

## Run Locally <a name='run-locally' />

**You must have docker & node installed on your machine**

For Hebrew speakers here is some short tutorials (Not all updated): [Tutorials](https://www.youtube.com/playlist?list=PLHhHN29St7TV5thp8GI9sRdrm2EZc46wC)

Clone the project

```bash
git clone https://github.com/Mathmate-il/mathmate-server.git
```

Go to the project directory

```bash
cd mathmate-server
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run start:dev
```

Start prisma studio

```bash
npx prisma studio
```

_Note: Install the prisma vsCode extension_

Run automated e2e tests (That's all we have so far)

```bash
npm run test:e2e
```

**You must set GOOGLE_CLIENT_CREDENTIALS in .env.test to run e2e tests successfully**

## Environment Variables

**Please look at .env.example**

## Acknowledgements

### Our contributors <a name='contributors' />

<a href="https://github.com/Mathmate-il/Mathmate-server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Mathmate-il/Mathmate-server" />
</a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
