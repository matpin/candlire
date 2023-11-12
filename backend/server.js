const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./connection");
const socketIO = require("socket.io");
require("dotenv").config();
const port = process.env.PORT;
const server = require("http").Server(app)

const productRoutes = require("./routers/productRouter");
const userRoutes = require('./routers/userRouter');
const favoriteRoutes = require("./routers/favoritesRouter");
const orderRoutes = require("./routers/orderRouter");
const chatRoutes = require("./routers/chatRouter");
const messageRoutes = require("./routers/messageRouter");
const stripeRoutes = require("./routers/stripeRouter");

//middleware
app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));
app.use(cors());

const io = socketIO(server);

app.use((req, res, next) => {
    req.io = io;
    next();
  });

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", favoriteRoutes);
app.use("/", orderRoutes);
app.use("/", chatRoutes);
app.use("/", messageRoutes);
app.use("/", stripeRoutes);


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`);

    // socket.on("sendMessage", (data) => {
    //     io.emit("message", data)
    // })

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });
});
