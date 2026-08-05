/*
  Warnings:

  - You are about to drop the column `imageId` on the `Score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_imageId_fkey";

-- DropIndex
DROP INDEX "Score_imageId_timeTaken_idx";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "imageId";

-- CreateIndex
CREATE INDEX "Score_timeTaken_idx" ON "Score"("timeTaken");
