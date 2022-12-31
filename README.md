# MathOverflow

**Overview**

Welcome to our server side repo of the MathOverflow project.

Our mission is make mathematics accessible to all via a convenient
platform to share and inquire on mathematical concepts.

## How to contribute

1. Clone the repo to your PC
2. Make sure you install all the needed dependencies using `npm install`
3. Install postgreSQL to your PC and create an account there.
4. In the .env file create a connection your local data base like this `postgresql://postgres:<password>@localhost:5432/<database-name>`
5. Run `Prisma migrate dev` this will migrate all our prisma models to your local db.

## Rules

`Note that some of the rules are temporary for the start`

1. Do not change models, any pull request that has in any way change in the prisma schema will be rejected (Unless there is a personal request)
2. Until we will create our QA env we are rejecting code without a related test.
3. Non-informative commits will be rejected
4. Non-informative pull requests messages will be rejected
5. Non-informative branch name will be rejected

Please join our discord channel! [Channel](https://discord.gg/JxWbxEJ8Vx)
