const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const API_PORT = process.env.PORT || 4000;
const app = express();

require("dotenv").config();

const api = require("./api");

mongoose.connect(process.env.CONNECTION_STRING);
let db = mongoose.connection;

// db connection and connection error handling
db.once("open", () => { console.log('Connected to database.')});
db.on("error", console.error.bind(console, 'MongoDB connection error:'));

// logger middleware
if(process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

app.use(cors());

// parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// serve React app from build folder
app.use(express.static("build"))

// router API requests
app.use("/api", api);

// route any non-server requests to React app
app.use((_, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(API_PORT, () => { console.log(`Listening on port ${API_PORT}.`)});