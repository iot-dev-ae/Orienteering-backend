-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "iban" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
