require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/my_todo");
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server Started"));

const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);
