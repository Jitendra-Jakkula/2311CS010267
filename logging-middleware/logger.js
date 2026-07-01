const axios = require("axios");
const TOKEN = require("./config");

const Log = async (stack, level, packageName, message) => {

    try {

        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        return response.data;

    } catch (err) {

        console.error("Logger Error:",
            err.response?.data || err.message
        );

        
        return null;
    }

};

module.exports = Log;