const express = require("express");
const router = express.Router();

const { getPatientById } = require("../controllers/patientController");
const {
  createRepayment,
  calculateRepayment,
  getRepaymentDetailsByPatientId,
} = require("../controllers/repaymentController");

/**
 * @swagger
 * /repayment/calculate-repayment:
 *   post:
 *     tags:
 *      - Repayments
 *     summary: Calculate and create a repayment for a patient.
 *     description: Calculates the repayment amount for a patient based on their mutual society's coverage and creates a new repayment entry in the database.
 *     requestBody:
 *       description: Request body for calculating the repayment.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               intervention:
 *                 type: string
 *               interventionCommentary:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *             example:
 *               patientId: "12345"
 *               date: "2023-11-07T10:00:00Z"
 *               location: "Hospital XYZ"
 *               intervention: "Surgery"
 *               interventionCommentary: "Successful surgery"
 *               totalPrice: 1000
 *     responses:
 *       201:
 *         description: Successful repayment calculation and creation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 value:
 *                   type: number
 *             example:
 *               message: "The repayment has been done"
 *               value: 900
 *       400:
 *         description: Bad request. Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Invalid input data"
 *       404:
 *         description: Patient not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Patient not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Internal server error"
 */
router.post("/calculate-repayment", async (req, res) => {
  const {
    patientId,
    date,
    location,
    intervention,
    interventionCommentary,
    totalPrice,
  } = req.body;

  try {
    const patient = await getPatientById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const percentageCovered = patient.mutualSociety.percentageCovered;

    const repaymentData = {
      patientId,
      date,
      location,
      intervention,
      interventionCommentary,
      totalPrice,
      percentageCovered,
    };

    await createRepayment(repaymentData);

    const repaymentAmount = calculateRepayment(totalPrice, percentageCovered);

    res.status(201).json({
      message:
        "The repayment has been done. The amount repayed by the mutual society is following",
      value: repaymentAmount,
    });
  } catch (error) {
    console.error("Error during repayment:", error);
    res.status(500).json({ error: "Error during repayment" });
  }
});

/**
 * @swagger
 * /repayment/get-repayment-details/{patientId}:
 *   get:
 *     tags:
 *       - Repayments
 *     summary: Get repayment details for a patient.
 *     description: Retrieves repayment details for a patient based on the provided patientId.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The patient's ID to get repayment details for.
 *     responses:
 *       200:
 *         description: Successful retrieval of repayment details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RepaymentDetails'
 *       404:
 *         description: Patient or repayment details not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RepaymentDetails:
 *       type: object
 *       properties:
 *         intervention:
 *           type: string
 *           description: The type of intervention.
 *         totalPrice:
 *           type: number
 *           description: The total price of the intervention.
 *         percentageCovered:
 *           type: number
 *           description: The percentage covered by the mutual society.
 *       example:
 *         intervention: "Surgery"
 *         totalPrice: 1000
 *         percentageCovered: 90
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: A description of the error.
 *       example:
 *         error: "Patient not found"
 */
router.get("/get-repayment-details/:patientId", async (req, res) => {
  const patientId = req.params.patientId;

  try {
    const patient = await getPatientById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const repaymentDetails = await getRepaymentDetailsByPatientId(patientId);

    if (!repaymentDetails) {
      return res.status(404).json({ error: "Repayment details not found" });
    }

    res.status(200).json(repaymentDetails);
  } catch (error) {
    console.error("Error during retrieval of repayment details:", error);
    res
      .status(500)
      .json({ error: "Error during retrieval of repayment details" });
  }
});

module.exports = router;
