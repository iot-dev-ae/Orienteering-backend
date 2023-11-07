-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_mutualSocietyId_fkey";

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "mutualSocietyId" DROP NOT NULL,
ALTER COLUMN "mutualSocietyId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_mutualSocietyId_fkey" FOREIGN KEY ("mutualSocietyId") REFERENCES "MutualSociety"("id") ON DELETE SET NULL ON UPDATE CASCADE;
