/*
  Warnings:

  - You are about to drop the `logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "logs";

-- CreateTable
CREATE TABLE "logs_runner" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_runner" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "message" VARCHAR(256),

    CONSTRAINT "logs_runner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs_beacon" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "id_race" INTEGER NOT NULL,
    "id_runner" INTEGER NOT NULL,
    "id_beacon" INTEGER NOT NULL,
    "runner_longitude" DOUBLE PRECISION NOT NULL,
    "runner_latitude" DOUBLE PRECISION NOT NULL,
    "runner_altitude" DOUBLE PRECISION NOT NULL,
    "message" VARCHAR(256),

    CONSTRAINT "logs_beacon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logs_runner" ADD CONSTRAINT "logs_runner_id_runner_fkey" FOREIGN KEY ("id_runner") REFERENCES "runners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_runner" ADD CONSTRAINT "logs_runner_id_race_fkey" FOREIGN KEY ("id_race") REFERENCES "races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_beacon" ADD CONSTRAINT "logs_beacon_id_runner_fkey" FOREIGN KEY ("id_runner") REFERENCES "runners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_beacon" ADD CONSTRAINT "logs_beacon_id_race_fkey" FOREIGN KEY ("id_race") REFERENCES "races"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs_beacon" ADD CONSTRAINT "logs_beacon_id_beacon_fkey" FOREIGN KEY ("id_beacon") REFERENCES "beacons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
