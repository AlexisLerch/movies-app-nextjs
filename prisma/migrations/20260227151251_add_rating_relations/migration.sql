/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[movieId,userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Rating` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_movieId_userId_key" ON "Rating"("movieId", "userId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
