const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("../utils/crypt");
const prisma = new PrismaClient();

// Create a new runner
async function createRunner(runnerData) {
  const hashedPassword = await hash(runnerData.password);

  const newRunner = await prisma.runner
    .create({
      data: {
        firstname: runnerData.firstname,
        lastname: runnerData.lastname,
        birthdate: new Date(runnerData.birthdate).toISOString(),
        login: runnerData.login,
        password: hashedPassword,
      },
    })
    .catch((error) => {
      if (error.code === "P2002") {
        throw new Error("Runner with this login already exists");
      }
      console.error("Error creating runner:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const returnRunner = {
    id: newRunner.id,
    firstname: newRunner.firstname,
    lastname: newRunner.lastname,
    login: newRunner.login,
  };

  console.log("New runner created:", returnRunner);
  return returnRunner;
}

// Verify runner login
async function verifyRunnerLogin(login, password) {
  try {
    // Find the runner by username
    const runner = await prisma.runner.findUnique({
      where: { login: login }
    });

    if (!runner) {
      console.error("Runner not found");
      return null;
    }

    // Verify the provided password
    const isPasswordValid = await verify(password, runner.password);

    if (isPasswordValid) {
      console.log("Login successful");

      const returnRunner = {
        id: runner.id,
        firstname: runner.firstname,
        lastname: runner.lastname,
        login: runner.login,
      };

      return returnRunner;
    } else {
      console.error("Invalid password");
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

async function getRunnerById(runnerId) {
  try {
    const runner = await prisma.runner.findUnique({
      where: { id: runnerId },
    });

    if (!runner) {
      console.error("Runner not found");
      return null;
    }

    return runner;
  } catch (error) {
    console.error("Error getting runner:", error);
    return null;
  }
}

module.exports = {
  createRunner,
  verifyRunnerLogin,
  getRunnerById,
};
