const express = require("express");
const router = express.Router();

// Import the functions for creating patients and verifying login
const {
  createPatient,
  verifyPatientLogin,
} = require("../controllers/patientController");

/**
 * @swagger
 *   /patient/register:
 *     post:
 *       summary: Register a new patient
 *       tags:
 *       - Patients
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientId:
 *                   type: string
 *                   description: The unique identifier for the patient
 *                   example: "123456"
 *                 password:
 *                   type: string
 *                   description: The password for the patient
 *                   example: "securePassword123"
 *                 iban:
 *                   type: string
 *                   description: The IBAN (International Bank Account Number) for the patient
 *                   example: "GB82WEST12345698765432"
 *                 mutualSocietyId:
 *                   type: integer
 *                   description: The ID of the mutual society associated with the patient
 *                   example: 0
 *       responses:
 *         '201':
 *           description: Patient registered successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "Patient registered successfully"
 *                 data:
 *                   patientId: "123456"
 *                   iban: "GB82WEST12345698765432"
 *         '400':
 *           description: Patient with ID already exists
 *           content:
 *             application/json:
 *               example:
 *                 error: "Patient with ID already exists"
 *         '500':
 *           description: Error during patient registration
 *           content:
 *             application/json:
 *               example:
 *                 error: "Error during patient registration"
 */
router.post("/register", async (req, res) => {
  const { patientId, password, iban, mutualSocietyId } = req.body;

  try {
    const patientData = { patientId, password, iban, mutualSocietyId };
    const patient = await createPatient(patientData);
    res
      .status(201)
      .json({ message: "Patient registered successfully", data: patient });
  } catch (error) {
    if (error.message === "Patient with ID already exists") {
      res.status(400).json({ error: "Patient with ID already exists" });
    } else {
      console.error("Error during patient registration:", error);
      res.status(500).json({ error: "Error during patient registration" });
    }
  }
});

/**
/**
 * @swagger
 * paths:
 *   /patient/login:
 *     post:
 *       summary: Authenticate and log in a patient
 *       tags:
 *       - Patients
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientId:
 *                   type: string
 *                   description: The unique identifier for the patient
 *                   example: "123456"
 *                 password:
 *                   type: string
 *                   description: The password for the patient
 *                   example: "securePassword123"
 *       responses:
 *         '200':
 *           description: Login successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "Login successful"
 *                 data:
 *                   patientId: "123456"
 *         '401':
 *           description: Login failed
 *           content:
 *             application/json:
 *               example:
 *                 error: "Login failed"
 */
router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  const returnedPatient = await verifyPatientLogin(patientId, password);

  if (returnedPatient) {
    res
      .status(200)
      .json({ message: "Login successful", data: returnedPatient });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

module.exports = router;
