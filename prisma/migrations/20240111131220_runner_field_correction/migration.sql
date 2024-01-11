/*
  Warnings:

  - You are about to drop the column `fistname` on the `runners` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `runners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "runners" DROP COLUMN "fistname",
ADD COLUMN     "firstname" VARCHAR(256) NOT NULL;
