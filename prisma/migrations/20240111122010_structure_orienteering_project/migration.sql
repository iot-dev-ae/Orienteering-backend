/*
  Warnings:

  - You are about to drop the `MutualSociety` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_mutualSocietyId_fkey";

-- DropForeignKey
ALTER TABLE "Repayment" DROP CONSTRAINT "Repayment_patientId_fkey";

-- DropTable
DROP TABLE "MutualSociety";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "Repayment";

-- CreateTable
CREATE TABLE "runners" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "login" VARCHAR(256) NOT NULL,
    "fistname" VARCHAR(256) NOT NULL,
    "lastname" VARCHAR(256) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "runners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "races" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "races_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runner_race" (
    "runnerId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "bibNumber" INTEGER NOT NULL,
    "totalTime" DOUBLE PRECISION,

    CONSTRAINT "runner_race_pkey" PRIMARY KEY ("runnerId","raceId")
);

-- CreateTable
CREATE TABLE "beacons" (
    "id" SERIAL NOT NULL,
    "id_race" INTEGER NOT NULL,
    "pos_GPS" DOUBLE PRECISION[],

    CONSTRAINT "beacons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "module" VARCHAR(256) NOT NULL,
    "message" VARCHAR(256) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "runners_login_key" ON "runners"("login");

-- AddForeignKey
ALTER TABLE "runner_race" ADD CONSTRAINT "runner_race_runnerId_fkey" FOREIGN KEY ("runnerId") REFERENCES "runners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runner_race" ADD CONSTRAINT "runner_race_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beacons" ADD CONSTRAINT "beacons_id_race_fkey" FOREIGN KEY ("id_race") REFERENCES "races"("id") ON DELETE CASCADE ON UPDATE CASCADE;
