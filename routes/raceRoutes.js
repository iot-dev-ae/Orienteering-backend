const express = require("express");
const router = express.Router();

// Import the functions for creating runners and verifying login
const {
    createRace,
    getRaceById,
    updateRace,
} = require("../controllers/raceController");
/**
 * @swagger
 * components:
 *   schemas:
 *     Beacon:
 *       type: object
 *       required:
 *         - id_race
 *         - pos_GPS
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         id_race:
 *           type: integer
 *           format: int64
 *         pos_GPS:
 *           type: array
 *           items:
 *             type: number
 *           description: GPS position of the beacon (latitude, longitude, altitude)
 *           minItems: 3
 *           maxItems: 3
 *           example: [40.7128, -74.0060, 10]
 *
 *     Race:
 *       type: object
 *       required:
 *         - name
 *         - dateTime
 *         - beacons
 *       properties:
 *         name:
 *           type: string
 *         dateTime:
 *           type: string
 *           format: date-time
 *         beacons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Beacon'
 *       example:
 *         name: "My Race"
 *         dateTime: "2022-01-11T12:00:00Z"
 *         beacons:
 *           - id: 1
 *             id_race: 123
 *             pos_GPS: [40.7128, -74.0060, 10]
 */

/**
 * @swagger
 * /race/createRace:
 *   post:
 *     summary: Create a new race
 *     tags: [Race]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       201:
 *         description: Race created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Race created successfully
 *               data:
 *                 _id: "5f64d5f844f9d141d0aaf27c"
 *                 name: "My Race"
 *                 dateTime: "2022-01-11T12:00:00Z"
 *                 beacons:
 *                   - id: 1
 *                     id_race: 123
 *                     pos_GPS: [40.7128, -74.0060, 10]
 */
router.post("/createRace", async (req, res) => {
    const { name, dateTime, beacons } = req.body;

    try {
        const raceData = { name, dateTime, beacons };
        const race = await createRace(raceData);
        res
            .status(201)
            .json({ message: "Race created successfully", data: race });
    } catch (error) {
        console.error("Error during race creation:", error);
        res.status(500).json({ error: "Error during race creation" });
    }
});


/**
 * @swagger
 * /race/getRaceById/{raceId}:
 *   get:
 *     summary: Get race information by ID
 *     tags: [Race]
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Race information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 */
router.get("/getRaceById/:raceId", async (req, res) => {
    const raceId = req.params.raceId;

    try {
        const race = await getRaceById(raceId);

        if (race == null) {
            res
            .status(404)
            .json({ error: "Race not found" })
        }
        else{
            res
            .status(200)
            .json({ message: "Race informations : ", data: race });
        }


        
    } catch (error) {
        console.error("Error during race fetching:", error);
        res.status(500).json({ error: "Error during race fetching" });
    }
});

/**
 * @swagger
 * /race/updateRace:
 *   put:
 *     summary: Update race information
 *     tags: [Race]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: Race updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Race updated successfully
 *               data:
 *                 id: "5f64d5f844f9d141d0aaf27c"
 *                 name: "My Updated Race"
 *                 dateTime: "2022-01-11T14:00:00Z"
 *                 status: "Pending"
 *                 beacons: [{ id: 1, id_race: 123, pos_GPS: [40.7128, -74.0060, 10] }]
 */
router.put("/updateRace", async (req, res) => {
    const raceData = req.body;

    try {
        const race = await updateRace(raceData);
        res
            .status(200)
            .json({ message: "Race updated succesfully : ", data: race });
    } catch (error) {
        console.error("Error during race update:", error);
        res.status(500).json({ error: "Error during race update" });
    }
});

module.exports = router;
