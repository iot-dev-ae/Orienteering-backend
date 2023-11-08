const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("../utils/crypt");
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
      console.error("Error creating patient:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("New patient created:", newPatient);
}

// Verify patient login
async function verifyPatientLogin(patientId, password) {
  try {
    // Find the patient by username
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      console.error("Patient not found");
      return null;
    }

    // Verify the provided password
    const isPasswordValid = await verify(password, patient.password);

    if (isPasswordValid) {
      console.log("Login successful");
      return patient.id;
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
