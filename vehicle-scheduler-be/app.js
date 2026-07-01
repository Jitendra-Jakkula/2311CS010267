const express = require("express");

const app = express();

app.use(express.json());

const vehicleRoutes = require("./routes/vehicleRoutes");

app.use("/api", vehicleRoutes);

app.listen(3000,()=>{
    console.log("Server running at port 3000");
});