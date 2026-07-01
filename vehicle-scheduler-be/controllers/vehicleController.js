const {
    getDepots,
    getVehicles
} = require("../services/apiService");

const Log = require("../../logging-middleware/logger");
const knapsack = require("../algorithm");

const getSchedule = async (req, res) => {

    try {

        const depos = await getDepots();

        await Log(
            "backend",
            "info",
            "service",
            "Fetched depot details successfully"
        );

        const vehi = await getVehicles();

        await Log(
            "backend",
            "info",
            "service",
            "Fetched vehicle details successfully"
        );

        const res2 = [];

        for (const d of depos) {

            const sch = knapsack(
                vehi,
                d.MechanicHours
            );

            res2.push({
                DepotID: d.ID,
                MechanicHours: d.MechanicHours,
                TotalImpact: sch.totalImpact,
                Tasks: sch.tasks
            });

        }

        await Log(
            "backend",
            "info",
            "service",
            "Vehicle scheduling completed successfully"
        );

        res.json(res2);

    } catch (err) {

        await Log(
            "backend",
            "error",
            "controller",
            err.message
        );

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getSchedule
};