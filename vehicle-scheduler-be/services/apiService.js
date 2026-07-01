const axios = require("axios");

const TOKEN = require("../../logging-middleware/config");

const URL = "http://4.224.186.213/evaluation-service";

const headers = {
    Authorization: `Bearer ${TOKEN}`
};

const getDepots = async () => {

    const res = await axios.get(
        `${URL}/depots`,
        { headers }
    );

    return res.data.depots;
};

const getVehicles = async () => {

    const res = await axios.get(
        `${URL}/vehicles`,
        { headers }
    );

    return res.data.vehicles;
};

module.exports = {
    getDepots,
    getVehicles
};