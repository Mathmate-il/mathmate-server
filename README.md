# Mathmate

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![node](https://img.shields.io/badge/node-16.13.1-green)
![npm](https://img.shields.io/badge/npm-8.1.2-green)
![PRs](https://img.shields.io/badge/PRs-Coming%20soon-orange)

**version: v0.0.1**

## Table of contents

1. [Clone](#clone)
2. [Setup](#setup)
3. [Workflow](#workflow)
4. [Conventions](#conventions)

## Our vision

**Our mission is to make math accessible, practical and fun, by utilizing the power of community and collaboration.**

---

## Project overview

**Stage 1:**

- Community based forum where anyone can ask math-related questions using a well suited interface.
- Implementing tagging system

**Stage 2:**

- Implementing a scoring system to increase reliability
- Data driven filtering and querying

**Stage 3:**

- Expanding our math subjects to more complex interfaces such as: Geometry, graphs, etc.

---

## How to contribute

### Clone & Install <a name="clone"></a>

- Make sure you have node v16.13.1 and npm 8.1.2 (Or above)
- Fork the repo to your github  
  `git clone https://github.com/Mathmate-il/Mathmate-server.git`
  `npm install`

---

### Setup <a name="setup"></a>

- Install postgreSQL **v15** with **pgadmin4** --- **Make sure you remember the password !**
- Create a database in your pgadmin4 -> **NEED TO INSERT A VIDEO HERE!!!**
- Download vsCode Prisma extension here [Link](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- Create a user in OAuth2 google and create a connection -> **NEED TO INSERT A VIDEO HERE!!!**
- Update the .env with your credentials and DATABASE_URL, look at `src/auth/auth.service` for the names.
- Run `prisma migrate dev` this will migrate the Prisma schemas into you local DB.

---

### Workflow <a name="workflow"></a>

- Connect in the discord channel to your relevant team (FE\BE\QA\UX-UI).
- Get your first issue and open a branch for it.
- Before any pull-request make sure your branch is up-to-date `git pull` & `git merge --squash main`

---

### Conventions <a name="conventions"></a>

- Create functions as global as possible (Generic, reusable)
- Readable and descriptive names to your functions and variables (Don't use "and", function is single tasked)
- A function name must start with a verb. (create, handle, delete, update, check, etc.)
- Variable must be a nouns, don't use acronyms! (don't: cds, uss, ion <----> do: cards, users, isOpen)
- We already implemented pre-commit linting using husky, here is the allowed conventions,
  the syntax for your commits will be the following: `git commit -am "type: message"`
  All the allowed types:

  - build
  - chore
  - ci
  - docs
  - feat
  - fix
  - perf
  - refactor
  - revert
  - style
  - test

  **Please follow the instructions**

## Where to find us

[Discord channel](https://discord.gg/ysffT6BpX7)

## Our contributors

<a href = "https://github.com/Mathmate-il/Mathmate-server/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo = GitHub_username/repository_name"/>
</a>

## License

This repository is [MIT Licensed](https://github.com/Mathmate-il/Mathmate-server/blob/main/LICENCE)
