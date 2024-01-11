const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RaceStatus = {
  Pending: 'Pending',
  InProgress: 'In Progress',
  Completed: 'Completed',
  Canceled: 'Canceled',
};

function isValidRaceStatus(newStatus) {
  Object.values(RaceStatus).includes(newStatus);
}

// Create a new race
async function createRace(raceData) {

  const newRace = await prisma.race
    .create({
      data: {
        name: raceData.name,
        dateTime: raceData.dateTime,
        status: RaceStatus.Pending,
        beacons: raceData.beacons,
      },
    })
    .catch((error) => {
      console.error("Error creating race:", error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const returnRace = {
    id: newRace.id,
    name: newRace.name,
    dateTime: newRace.dateTime,
    beacons: newRace.beacons,
  };

  console.log("New race created:", returnRace);
  return returnRace;
}

async function getRaceById(raceId) {
  try {
    const race = await prisma.race.findUnique({
      where: { id: parseInt(raceId) },
      include :{
        beacons: true,
        participants: true,
      },
    });

    if (!race) {
      throw new Error("No race with this ID was found");
    }

    return race;
  } catch (error) {
    console.error("Error getting race:", error);
    return null;
  }
}

async function updateRace(raceData) {
  try{  

    if (raceData.status) {
      const isValidStatus=isValidRaceStatus(raceData.status);

        if(!isValidStatus){
          throw new Error("Invalid status");
        }
    }

    const updatedRace = await prisma.race.update({
      where : {id:parseInt(raceData.id)},
        data: raceData,
        
      })

      return updatedRace;
  }
  catch (error) {
    console.error("Error updating race status :", error)
    return false;
  }

}


module.exports = {
  createRace,
  getRaceById,
  updateRace,
};
