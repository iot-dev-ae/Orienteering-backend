const express = require("express");
const router = express.Router();

// Import the functions for creating patients and verifying login
const {
  createPatient,
  verifyPatientLogin,
} = require("../controllers/patientController");

/**
 * @swagger
 * /patient/register:
 *   post:
 *     summary: Register a new patient
 *     tags:
 *      - Patients
 *     requestBody:
 *       description: Patient registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               password:
 *                 type: string
 *               iban:
 *                 type: string
 *               mutualSocietyId:
 *                type: integer
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *       500:
 *         description: Error during patient registration
 */
router.post("/register", async (req, res) => {
  const { patientId, password, iban, mutualSocietyId } = req.body;

  try {
    const patientData = { patientId, password, iban, mutualSocietyId };
    await createPatient(patientData);
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.error("Error during patient registration:", error);
    res.status(500).json({ error: "Error during patient registration" });
  }
});

/**
 * @swagger
 * /patient/login:
 *   post:
 *     summary: Login a patient
 *     tags:
 *      - Patients
 *     requestBody:
 *       description: Patient login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Login failed
 */
router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  const returnedPatient = await verifyPatientLogin(patientId, password);

  if (patient) {
    res
      .status(200)
      .json({ message: "Login successful", pateintId: returnedPatient });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

module.exports = router;
