const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

app.use("/", userRouter);

app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

module.exports = app;