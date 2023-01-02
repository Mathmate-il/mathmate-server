# MathOverflow

**version: v0.0.1**

## Table of contents

1. [Clone](#clone)
2. [Setup](#setup)
3. [Rules](#rules)

## Our vision

## Project overview

## How to contribute

- Clone & Install <a name="clone"></a>
  - `git clone https://github.com/MathOverflow-IL/MathOverflow.git`
  - `npm run install`
- Setup <a name="setup"></a>
  - Install postgreSQL **v15** with **pgadmin4** --- **Make sure you remember the password !**
  - Create a database in your pgadmin4 -> **NEED TO INSERT A VIDEO HERE!!!**
  - Download vsCode Prisma extension here [Link](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  - Create a user in OAuth2 google and create a connection -> **NEED TO INSERT A VIDEO HERE!!!**
  - Update the .env with your credentials and DATBASE_URL, look at `src/auth/auth.service` for the names.
  - Run `prisma migrate dev` this will migrate the Prisma schemas into you local DB.
- Workflow <a name="rules"></a>
  - Connect in the discord channel to your relevant team (FE\BE\QA\UX-UI)
  -

## Where to find us

- [Discord channel](https://discord.gg/ysffT6BpX7)

## License
