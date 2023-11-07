const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*
    * Create a new repayment
    * @param {Object} repaymentData - The repayment data
    * @param {string} repaymentData.patientId - The patient ID
    * @param {string} repaymentData.date - The date of the repayment
    * @param {number} repaymentData.totalPrice - The total price of the intervention
    * @param {number} repaymentData.percentageCovered - The percentage covered by the mutual society
    * @param {string} repaymentData.intervention - The intervention
    * @param {string} repaymentData.interventionCommentary - The intervention commentary
    * @returns {Object} - The repayment amount and the new repayment
    
* @throws {Error} - An error occurred during the repayment creation
    * @throws {Error} - An error occurred during the repayment calculation
    * @throws {Error} - An error occurred during the patient fetching
    * @throws {Error} - An error occurred during the patient verification
    * @throws {Error} - An error occurred during the patient fetching
*/
async function createRepayment(repaymentData) {
  const {
    patientId,
    date,
    location,
    totalPrice,
    percentageCovered,
    intervention,
    interventionCommentary,
  } = repaymentData;

  const newRepayment = await prisma.repayment
    .create({
      data: {
        date,
        patientId,
        location,
        totalPrice,
        percentageCovered,
        intervention,
        interventionCommentary,
      },
    })
    .catch((error) => {
      console.error("Error creating repayment:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

function calculateRepayment(totalPrice, percentageCovered) {
  return (1 - percentageCovered / 100) * totalPrice;
}

module.exports = {
  createRepayment,
  calculateRepayment,
};

async function getRepaymentDetailsByPatientId(patientId) {
  try {
    const repaymentDetails = await prisma.repayment.findMany({
      where: {
        patientId: patientId,
      },
    });

    return repaymentDetails;
  } catch (error) {
    console.error("Error while fetching repayment details:", error);
    throw new Error("Error while fetching repayment details");
  }
}

module.exports = {
  getRepaymentDetailsByPatientId,
};
