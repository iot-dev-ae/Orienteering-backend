-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "mutualSocietyId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "MutualSociety" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "percentageCovered" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MutualSociety_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repayment" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "location" TEXT,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "percentageCovered" DOUBLE PRECISION,
    "intervention" TEXT NOT NULL,
    "interventionCommentary" TEXT,

    CONSTRAINT "Repayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_mutualSocietyId_fkey" FOREIGN KEY ("mutualSocietyId") REFERENCES "MutualSociety"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repayment" ADD CONSTRAINT "Repayment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
