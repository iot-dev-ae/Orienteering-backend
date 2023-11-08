const express = require("express");
const {
  getAllMutualSociety,
  getMutualSocietyById,
} = require("../controllers/mutualSocietyController");
const router = express();

/**
 * @swagger
 * /mutual-society:
 *   get:
 *     summary: Get all Mutual Societies
 *     description: Retrieve a list of all Mutual Societies.
 *     tags:
 *      - Mutual Societies
 *     responses:
 *       200:
 *         description: A list of Mutual Societies.
 *       500:
 *         description: Internal server error.
 */
router.get("/", async (req, res) => {
  try {
    const mutualSocieties = await getAllMutualSociety();
    res.json(mutualSocieties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting mutual societies");
  }
});

/**
 * @swagger
 * /mutual-society/{id}:
 *   get:
 *     summary: Get a Mutual Society by ID
 *     description: Retrieve a Mutual Society by its ID.
 *     tags:
 *     - Mutual Societies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Mutual Society to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The Mutual Society.
 *       404:
 *         description: Mutual Society not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const mutualSociety = await getMutualSocietyById(id);

    if (!mutualSociety) {
      res.status(404).send("Mutual Society not found");
      return;
    }

    res.json(mutualSociety);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting mutual society");
  }
});

module.exports = router;
