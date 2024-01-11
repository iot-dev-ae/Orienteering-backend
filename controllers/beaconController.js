const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {createLog} = require("./logController");

async function checkBeacon(runnerData) {
    try{
    const beacons = await prisma.beacon.findMany({
        select: {id:true,pos_GPS: true},
        where: { id_race: runnerData.id_race , name: runnerData.beacon_name }
    });
    
    const beacon = beacons[0];
    const runnerPos=runnerData.runner_pos_GPS
    
    if (!beacon) {
        createLog({
            datetime: new Date(),
            type: "Warning",
            module: "Beacon",
            metadata:[runnerData.id_race, 
                runnerData.id_runner, 
                -1, 
                runnerPos.longitude, 
                runnerPos.latitude, 
                runnerPos.altitude,],
            message: "No beacon with this name was found",
        });
        throw new Error("No beacon with this name was found");
    }
    const beaconPos = beacon.pos_GPS;

    const distance = Math.sqrt(Math.pow((beaconPos[0] - runnerPos.longitude), 2) 
                    + Math.pow((beaconPos[1] - runnerPos.latitude), 2));
    if(distance > beaconPos[2]){
        createLog({
            datetime: new Date(),
            type: "Warning",
            module: "Beacon",
            metadata:[runnerData.id_race, 
                runnerData.id_runner, 
                beacon.id, 
                runnerPos.longitude, 
                runnerPos.latitude, 
                runnerPos.altitude,],
            message: "Runner too far from the beacon",
        });
        throw new Error("Runner too far from the beacon");
    }

    createLog({
        datetime: new Date(),
        type: "Log",
        module: "Beacon",
        metadata:[runnerData.id_race, 
            runnerData.id_runner, 
            beacon.id, 
            runnerData.pos_GPS[0], 
            runnerData.pos_GPS[1], 
            runnerData.pos_GPS[2]],
        message: `Runner ${runnerData.id_runner} checked beacon ${runnerData.beacon_name} during race ${runnerData.id_race}`,
    });
    console.log(`Runner ${runnerData.id_runner} checked beacon ${runnerData.beacon_name} during race ${runnerData.id_race}`);

    } catch (error) {
        // Handle different error scenarios
        if (error.message === "No beacon with this name was found") {
            // Handle this specific case
            return { success: false, error: "No beacon found with the given name" };
        } else if (error.message === "Runner too far from the beacon") {
            // Handle this specific case
            return { success: false, error: "Runner is too far from the beacon" };
        } else {
            // Handle other generic errors
            console.error("Error during beacon check:", error);
            return { success: false, error: "An error occurred during beacon check" };
        }
    }
  }

  module.exports = {
    checkBeacon,
  };