const express = require("express");
const docRoutes = require("./routes/docRoutes");
const errorHandler = require("./middlewares/errorhandler")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/documents", docRoutes);
app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`);
})