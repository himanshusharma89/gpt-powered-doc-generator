require('dotenv').config();
const express = require("express");
const docRoutes = require("./routes/docRoutes");
const errorHandler = require("./middlewares/errorhandler")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/documents", docRoutes);
app.use(errorHandler);

module.exports = app;