const express = require("express");
const router = express.Router();

// Import the functions for creating runners and verifying login
const {
    createLog,
    getAllLogs,
} = require("../controllers/logController");

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API for managing logs
 */

/**
 * @swagger
 * path:
 *   /log/createLog:
 *     post:
 *       summary: Create a new log entry
 *       tags: [Logs]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datetime:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time of the log entry
 *                 type:
 *                   type: string
 *                   description: The type of the log entry
 *                 module:
 *                   type: string
 *                   description: The module related to the log entry
 *                 message:
 *                   type: string
 *                   description: The log message
 *       responses:
 *         '200':
 *           description: Log entry created successfully
 */
router.post("/createLog", async (req, res) => {
    const logData = req.body;

    try {
        const newLog = await createLog(logData);
        res
            .status(200)
            .json({ message: "Log successfully saved " });
    } catch (error) {
        console.error("Error during race fetching:", error);
        res.status(500).json({ error: "Error during log saving" });
    }

});

/**
 * @swagger
 * path:
 *   /log/getAllLogs:
 *     get:
 *       summary: Get all logs
 *       tags: [Logs]
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier for the log entry
 *                     datetime:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time of the log entry
 *                     type:
 *                       type: string
 *                       description: The type of the log entry
 *                     module:
 *                       type: string
 *                       description: The module related to the log entry
 *                     message:
 *                       type: string
 *                       description: The log message
 */

router.get("/getAllLogs", async (req, res) => {
    const logs = await getAllLogs();
    res.json(logs);
});

module.exports = router;