/*
  Warnings:

  - Added the required column `name` to the `beacons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "beacons" ADD COLUMN     "name" VARCHAR(256) NOT NULL;
