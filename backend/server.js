const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const port = process.env.PORT;

const productRoutes = require("./routers/productRouter");
const userRoutes = require('./routers/userRouter');
const favoriteRoutes = require("./routers/favoritesRouter");

//middleware
app.use(express.json());
app.use(cors());

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", favoriteRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});