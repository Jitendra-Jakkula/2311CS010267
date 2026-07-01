const axios = require("axios");

const TOKEN = require("../../logging-middleware/config");
const Log = require("../../logging-middleware/logger");

const URL = "http://4.224.186.213/evaluation-service";

const headers = {
    Authorization: `Bearer ${TOKEN}`
};

const getDepots = async () => {

    const res = await axios.get(
        `${URL}/depots`,
        { headers }
    );

    await Log(
        "backend",
        "info",
        "service",
        "Fetched depots from evaluation service"
    );

    return res.data.depots;
};

const getVehicles = async () => {

    const res = await axios.get(
        `${URL}/vehicles`,
        { headers }
    );

    await Log(
        "backend",
        "info",
        "service",
        "Fetched vehicles from evaluation service"
    );

    return res.data.vehicles;
};

module.exports = {
    getDepots,
    getVehicles
};