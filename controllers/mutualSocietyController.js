const { hash, verify } = require("../utils/crypt");
const { getPrismaClient } = require("@prisma/client/runtime/library");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getMutualSocietyById(societyId) {
  try {
    const society = await prisma.mutualSociety.findUnique({
      where: { id: societyId },
    });

    if (!society) {
      console.error("Mutual society not found");
      return null;
    }

    return society;
  } catch (error) {
    console.error("Error getting mutual society by id:", error);
    return null;
  }
}

async function getAllMutualSociety() {
  try {
    const societies = await prisma.findMany();

    return societies;
  } catch (error) {
    console.error("Error getting mutual societies :", error);
    return null;
  }
}

module.exports = {
  getAllMutualSociety,
  getMutualSocietyById,
};
