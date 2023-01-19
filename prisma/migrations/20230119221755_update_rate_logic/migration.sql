/*
  Warnings:

  - You are about to drop the column `rate` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "rate";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "rate";

-- CreateTable
CREATE TABLE "QuestionRating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerRating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    CONSTRAINT "AnswerRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionRating" ADD CONSTRAINT "QuestionRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionRating" ADD CONSTRAINT "QuestionRating_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerRating" ADD CONSTRAINT "AnswerRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerRating" ADD CONSTRAINT "AnswerRating_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
