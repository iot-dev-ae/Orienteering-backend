/*
  Warnings:

  - You are about to drop the column `DateTime` on the `races` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "races" DROP COLUMN "DateTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;
