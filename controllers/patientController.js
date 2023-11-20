const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("../utils/crypt");
const { getMutualSocietyById } = require("./mutualSocietyController");
const prisma = new PrismaClient();

// Create a new patient
async function createPatient(patientData) {
  const hashedPassword = await hash(patientData.password);

  const newPatient = await prisma.patient
    .create({
      data: {
        id: patientData.patientId,
        password: hashedPassword,
        iban: patientData.iban,
        mutualSocietyId: patientData.mutualSocietyId,
      },
    })
    .catch((error) => {
      if (error.code === "P2002") {
        throw new Error("Patient with ID already exists");
      }
      console.error("Error creating patient:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const mutualSociety = await getMutualSocietyById(newPatient.mutualSocietyId);

  const returnPatient = {
    id: newPatient.id,
    iban: newPatient.iban,
    mutualSociety: mutualSociety,
  };

  console.log("New patient created:", returnPatient);
  return returnPatient;
}

// Verify patient login
async function verifyPatientLogin(patientId, password) {
  try {
    // Find the patient by username
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        mutualSociety: true,
      },
    });

    if (!patient) {
      console.error("Patient not found");
      return null;
    }

    // Verify the provided password
    const isPasswordValid = await verify(password, patient.password);

    if (isPasswordValid) {
      console.log("Login successful");

      const returnPatient = {
        id: patient.id,
        iban: patient.iban,
        mutualSociety: patient.mutualSociety,
      };

      return returnPatient;
    } else {
      console.error("Invalid password");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

async function getPatientById(patientId) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: { mutualSociety: true },
    });

    if (!patient) {
      console.error("Patient not found");
      return null;
    }

    return patient;
  } catch (error) {
    console.error("Error getting patient:", error);
    return null;
  }
}

module.exports = {
  createPatient,
  verifyPatientLogin,
  getPatientById,
};
