const axios = require("axios");

const TOKEN = require("../../logging-middleware/config");
const Log = require("../../logging-middleware/logger");

const URL = "http://4.224.186.213/evaluation-service";

const headers = {
    Authorization: `Bearer ${TOKEN}`
};

const getNotifications = async () => {

    try {

        const res = await axios.get(
            `${URL}/notifications`,
            { headers }
        );

        await Log(
            "backend",
            "info",
            "service",
            "Fetched notifications successfully"
        );

        return res.data.notifications;

    } catch (err) {

        await Log(
            "backend",
            "error",
            "service",
            err.message
        );

        throw err;
    }

};

module.exports = {
    getNotifications
};