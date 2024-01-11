/*
  Warnings:

  - You are about to drop the column `end` on the `races` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `races` table. All the data in the column will be lost.
  - Added the required column `status` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "races" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "status" TEXT NOT NULL;
