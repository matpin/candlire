const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});