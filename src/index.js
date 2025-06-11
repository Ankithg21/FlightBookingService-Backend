const express = require("express");
const {serverConfig} = require("./config/index.js");
const apiRoutes = require("./routes");
const app = express();

app.use("/api",apiRoutes);

app.listen(serverConfig.PORT, ()=>{
    console.log(`Server Running on port:${serverConfig.PORT}`);
});