const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {createLog, getAllLogs, getLogsByParams} = require("./logController");

async function checkBeacon(runnerData) {
    try{
        const beacons = await prisma.beacon.findMany({
            select: {id:true,pos_GPS: true},
            where: { id_race: runnerData.id_race , name: runnerData.beacon_name }
        });
    
    const beacon = beacons[0];
    
    const runnerPos=runnerData.runner_pos_GPS;
    
    if (!beacon) {
        createLog({
            datetime: new Date(),
            type: "Warning",
            module: "Beacon",
            id_runner:runnerData.id_runner,
            id_race:runnerData.id_race,
            id_beacon:-1,
            runner_longitude:runnerPos.longitude,
            runner_latitude:runnerPos.latitude,
            runner_altitude:runnerPos.altitude,
            message: "No beacon with this name was found",
        });
        throw new Error("No beacon with this name was found");
    }
    const beaconPos = beacon.pos_GPS; //console.log(beacons[0],beacon,beaconPos);

    const distance = calculateDistance(
        runnerPos.latitude,
        runnerPos.longitude,
        beaconPos[1],
        beaconPos[0]
      );
      
      const thresholdDistanceMeters = 5; // Adjust as needed
      
      if (distance > thresholdDistanceMeters) {
        createLog({
            datetime: new Date(),
            type: "Warning",
            module: "Beacon",
            id_runner:runnerData.id_runner,
            id_race:runnerData.id_race,
            id_beacon:beacon.id,
            runner_longitude:runnerPos.longitude,
            runner_latitude:runnerPos.latitude,
            runner_altitude:runnerPos.altitude,
            message: "Runner too far from the beacon",
        });
        throw new Error("Runner too far from the beacon");
    }

    const params = {type:"Warning",module:"Beacon",id_race:runnerData.id_race,id_runner:runnerData.id_runner,id_beacon:beacon.id   }
    const logs=await getLogsByParams(params);
    

    if (logs.length > 0) {
            createLog({
            datetime: new Date(),
            type: "Warning",
            module: "Beacon",
            id_runner:runnerData.id_runner,
            id_race:runnerData.id_race,
            id_beacon:beacon.id,
            runner_longitude:runnerPos.longitude,
            runner_latitude:runnerPos.latitude,
            runner_altitude:runnerPos.altitude,
            message: `Beacon already checked`,
        });
        throw new Error("Beacon already checked");
    }

    createLog({
        datetime: new Date(),
        type: "Log",
        module: "Beacon",
        id_runner:runnerData.id_runner,
        id_race:runnerData.id_race,
        id_beacon:beacon.id,
        runner_longitude:runnerPos.longitude,
        runner_latitude:runnerPos.latitude,
        runner_altitude:runnerPos.altitude,
        message: `Runner ${runnerData.id_runner} checked beacon ${runnerData.beacon_name} during race ${runnerData.id_race}`,
    });
    
    console.log(`Runner ${runnerData.id_runner} checked beacon ${runnerData.beacon_name} during race ${runnerData.id_race}`);
    return { success: true };

    } catch (error) {
        // Handle different error scenarios
        if (error.message === "No beacon with this name was found") {
            // Handle this specific case
            return { success: false, error: "No beacon found with the given name" };
        } else if (error.message === "Runner too far from the beacon") {
            // Handle this specific case
            return { success: false, error: "Runner is too far from the beacon" };
            
        } else if (error.message === "Beacon already checked") {
            // Handle this specific case
            return { success: false, error: "Beacon already checked" };
            
        }else {
            // Handle other generic errors
            console.error("Error during beacon check:", error);
            return { success: false, error: "An error occurred during beacon check" };
        }
    }
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = angle => (angle * Math.PI) / 180;
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
  
    // Haversine formula to calculate distance
    const R = 6371 * 1000; // Earth radius in meters
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  }

  module.exports = {
    checkBeacon,
  };