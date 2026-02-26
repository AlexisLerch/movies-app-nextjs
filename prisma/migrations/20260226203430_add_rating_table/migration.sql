/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Rating` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Rating_movieId_userId_key";

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("movieId", "userId");
