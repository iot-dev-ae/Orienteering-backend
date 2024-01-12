-- DropForeignKey
ALTER TABLE "logs_beacon" DROP CONSTRAINT "logs_beacon_id_beacon_fkey";

-- AlterTable
ALTER TABLE "logs_beacon" ALTER COLUMN "id_beacon" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "logs_beacon" ADD CONSTRAINT "logs_beacon_id_beacon_fkey" FOREIGN KEY ("id_beacon") REFERENCES "beacons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
