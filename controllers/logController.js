const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LogTypes = {
    Info: 'Info',
    Warning: 'Warning',
    Error: 'Error',
};

function isValidLogType(newType) {
    Object.values(LogTypes).includes(newType);
}

const LogModules = {
    Beacon: 'Beacon',
    Runner: 'Runner',
    Race: 'Race',
};

function isValidLogModule(newModule) {
    Object.values(LogModules).includes(newModule);
}

// Create a new log
async function createLog(logData) {

    if (!isValidLogModule(logData.module)) {
        throw new Error("Invalid log  module");
    }
    if (!isValidLogType(logData.type)) {
        throw new Error("Invalid log  type");
    }

    const newLog = await prisma.log
        .create({
            data: {
                dateTime: logData.dateTime,
                type: logData,
                module: logData.module,
                metadata: logData.metadata,
                message: logData.beacons,
            },
        })
        .catch((error) => {
            console.error("Error creating log:", error);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });

    console.log("New log created:", newLog);
    return newLog;
}

async function getAllLogs() {
    try {
        const logs = await prisma.log.findMany();
        return logs;
    } catch (error) {
        console.error("Error during log retrieval:", error);
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    createLog,
    getAllLogs,
};