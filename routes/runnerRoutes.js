const express = require("express");
const router = express.Router();

// Import the functions for creating runners and verifying login
const {
  createRunner,
  verifyRunnerLogin,
} = require("../controllers/runnerController");

/**
 * @swagger
 * tags:
 *   name: Runners
 *   description: Operations related to runners

 * definitions:
 *   Runner:
 *     type: object
 *     properties:
 *       login:
 *         type: string
 *         description: The unique identifier for the runner
 *         example: "123456"
 *       password:
 *         type: string
 *         description: The password for the runner
 *         example: "securePassword123"
 *       firstname:
 *         type: string
 *         description: The firstname for the runner
 *         example: "John"
 *       lastname:
 *         type: string
 *         description: The lastname for the runner
 *         example: "Doe"
 *       birthdate:
 *         type: string
 *         description: The birthdate for the runner
 *         example: "1998-05-05"

 *   RunnerRegistrationResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Status message
 *         example: "Runner registered successfully"
 *       data:
 *         $ref: '#/definitions/Runner'

 *   RunnerLoginResponse:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Status message
 *         example: "Login successful"
 *       data:
 *         $ref: '#/definitions/Runner'
 * @swagger
 * /runner/register:
 *   post:
 *     summary: Register a new runner
 *     tags:
 *       - Runners
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Runner'
 *     responses:
 *       '201':
 *         description: Runner registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/RunnerRegistrationResponse'
 *       '400':
 *         description: Runner with this login already exists
 *         content:
 *           application/json:
 *             example:
 *               error: "Runner with this login already exists"
 *       '500':
 *         description: Error during runner registration
 *         content:
 *           application/json:
 *             example:
 *               error: "Error during runner registration"
 */
router.post("/register", async (req, res) => {
  const { login, password, firstname, lastname,birthdate } = req.body;

  try {
    const runnerData = { login, password, firstname, lastname,birthdate };
    const runner = await createRunner(runnerData);
    res
      .status(201)
      .json({ message: "Runner registered successfully", data: runner });
  } catch (error) {
    if (error.message === "Runner with this login already exists") {
      res.status(400).json({ error: "Runner with this login already exists" });
    } else {
      console.error("Error during runner registration:", error);
      res.status(500).json({ error: "Error during runner registration" });
    }
  }
});

/**
 * @swagger
 * paths:
 *   /runner/login:
 *     post:
 *       summary: Authenticate and log in a runner
 *       tags:
 *         - Runners
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 login:
 *                   type: string
 *                   description: The unique identifier for the runner
 *                   example: "123456"
 *                 password:
 *                   type: string
 *                   description: The password for the runner
 *                   example: "securePassword123"
 *       responses:
 *         '200':
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/definitions/RunnerLoginResponse'
 *         '401':
 *           description: Login failed
 *           content:
 *             application/json:
 *               example:
 *                 error: "Login failed"
 */
router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const returnedRunner = await verifyRunnerLogin(login, password);

  if (returnedRunner) {
    res
      .status(200)
      .json({ message: "Login successful", data: returnedRunner });
  } else {
    res.status(401).json({ error: "Login failed" });
  }
});

module.exports = router;
