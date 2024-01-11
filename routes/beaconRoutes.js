const express = require("express");
const router = express.Router();

const {
    checkBeacon,
} = require("../controllers/beaconController");

/**
 * @swagger
 * tags:
 *   name: Beacon
 *   description: API for checking beacons
 */

/**
 * @swagger
 *   /beacon/checkBeacon:
 *     post:
 *       summary: Check a beacon
 *       tags: [Beacon]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 runnerData:
 *                   type: object
 *                   properties:
 *                     id_race:
 *                       type: integer
 *                       description: The ID of the race
 *                     id_runner:
 *                       type: integer
 *                       description: The ID of the runner
 *                     beacon_name:
 *                       type: string
 *                       description: The name of the beacon
 *                     runner_pos_GPS:
 *                       type: object
 *                       properties:
 *                         longitude:
 *                           type: number
 *                           description: The longitude of the beacon position
 *                         latitude:
 *                           type: number
 *                           description: The latitude of the beacon position
 *                         altitude:
 *                           type: number
 *                           description: The altitude of the beacon position
 *       responses:
 *         '200':
 *           description: Beacon successfully checked
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Beacon successfully checked 
 *         '500':
 *           description: Error during beacon check
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Error message during beacon check
 */
router.post("/checkBeacon", async (req, res) => {
    const {runnerData } = req.body;

    try {
        await checkBeacon(runnerData);
        res
            .status(200)
            .json({ message: "Beacon successfully checked " });
    } catch (error) {
        console.error("Error during beacon check :", error);
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;