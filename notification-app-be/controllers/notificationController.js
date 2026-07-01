const {
    getNotifications
} = require("../services/apiService");

const Log = require("../../logging-middleware/logger");

const getNotificationsController = async (req, res) => {

    try {

        const notifications = await getNotifications();

        await Log(
            "backend",
            "info",
            "controller",
            "Notifications fetched successfully"
        );

        res.json(notifications);

    } catch (err) {

        await Log(
            "backend",
            "error",
            "controller",
            err.message
        );

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    getNotifications: getNotificationsController
};