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

async function getLogsByParams(params) {
    try {
        var logs = await prisma.log.findMany({
            where: {
                AND: [
                    { datetime: { gte: params.start } },
                    { datetime: { lte: params.end } },
                    { type: params.type },
                    { module: params.module },
                ],
            },
        });
        if(params.metadata){
            logs = filterLogsByMetadata(logs, params.metadata); console.log("Flogs",logs);
        }
            return logs;

    } catch (error) {
        console.error("Error during log retrieval:", error);
    } finally {
        await prisma.$disconnect();
    }
}

function filterLogsByMetadata(logs, MyArray) {
    console.log("logs",logs);
    console.log("myarray",MyArray);
    return logs.filter(log => {
        if (log.metadata) {
           const a=log.metadata.every((value, index) => MyArray[index] ? parseFloat(value) ==parseFloat(MyArray[index]):false);
           console.log("a",a);
           return a;
        //   return MyArray.every((value, index) => value === log[index]);
        }
        return false;
      });
    }


module.exports = {
    createLog,
    getAllLogs,
    getLogsByParams,
};