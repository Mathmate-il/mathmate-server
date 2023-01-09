/*
  Warnings:

  - You are about to drop the `_QuestionToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToUser" DROP CONSTRAINT "_QuestionToUser_B_fkey";

-- DropTable
DROP TABLE "_QuestionToTag";

-- DropTable
DROP TABLE "_QuestionToUser";

-- CreateTable
CREATE TABLE "_UsersAndBookmarks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionsAndTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsersAndBookmarks_AB_unique" ON "_UsersAndBookmarks"("A", "B");

-- CreateIndex
CREATE INDEX "_UsersAndBookmarks_B_index" ON "_UsersAndBookmarks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionsAndTags_AB_unique" ON "_QuestionsAndTags"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionsAndTags_B_index" ON "_QuestionsAndTags"("B");

-- AddForeignKey
ALTER TABLE "_UsersAndBookmarks" ADD CONSTRAINT "_UsersAndBookmarks_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsersAndBookmarks" ADD CONSTRAINT "_UsersAndBookmarks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsAndTags" ADD CONSTRAINT "_QuestionsAndTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsAndTags" ADD CONSTRAINT "_QuestionsAndTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
