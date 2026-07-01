const {
    getNotifications
} = require("../services/apiService");

const Log = require("../../logging-middleware/logger");

const priority = {
    Placement: 3,
    Result: 2,
    Event: 1
};

const getPriorityNotifications = async (req, res) => {

    try {

        const notifications = await getNotifications();

        notifications.sort((a, b) => {

            if (priority[b.Type] !== priority[a.Type]) {
                return priority[b.Type] - priority[a.Type];
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);

        });

        const top10 = notifications.slice(0, 10);

        await Log(
            "backend",
            "info",
            "controller",
            "Priority notifications generated successfully"
        );

        res.json(top10);

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
    getPriorityNotifications
};