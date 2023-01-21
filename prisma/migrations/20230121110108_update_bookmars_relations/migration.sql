/*
  Warnings:

  - You are about to drop the `_QuestionsAndTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UsersAndBookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionsAndTags" DROP CONSTRAINT "_QuestionsAndTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionsAndTags" DROP CONSTRAINT "_QuestionsAndTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_UsersAndBookmarks" DROP CONSTRAINT "_UsersAndBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsersAndBookmarks" DROP CONSTRAINT "_UsersAndBookmarks_B_fkey";

-- DropTable
DROP TABLE "_QuestionsAndTags";

-- DropTable
DROP TABLE "_UsersAndBookmarks";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTag_AB_unique" ON "_QuestionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTag_B_index" ON "_QuestionToTag"("B");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTag" ADD CONSTRAINT "_QuestionToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
