const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LogTypes = {
    Log: 'Log',
    Info: 'Info',
    Warning: 'Warning',
    Error: 'Error',
};

function isValidLogType(newType) {
    return Object.values(LogTypes).includes(newType);
}

const LogModules = {
    Beacon: 'Beacon',
    Runner: 'Runner',
    Race: 'Race',
};

function isValidLogModule(newModule) {
    return Object.values(LogModules).includes(newModule);
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
                datetime: new Date(logData.datetime),
                type: logData.type,
                module: logData.module,
                metadata: logData.metadata,
                message: logData.message,
            },
        })
        .catch((error) => {
            console.error("Error creating log:", error);
            throw new Error("Error creating log");
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