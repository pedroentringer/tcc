const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const server = express();

const path = require("path");
server.use("/public", express.static(path.join(__dirname, "public")));

//database
mongoose.connect("mongodb+srv://soscar:soscar@soscar-zdkxw.mongodb.net/soscar?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false });

//middlewares
server.use(cors());
server.use(express.json());

//routes
server.use(routes);
server.listen(3333);
