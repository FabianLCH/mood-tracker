const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Tally = require("./Tally");

const API_PORT = 4000;
const app = express();

const { dbRoute } = require("./secrets");

// locally stored list of moods
const moodList = ["Angry", "Disgusted", "Sad", "Happy", "Surprised", "Bad", "Fearful"];

const router = express.Router();

mongoose.connect(dbRoute, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

// db connection and connection error handling
db.once("open", () => { console.log('Connected to database.')});
db.on("error", console.error.bind(console, 'MongoDB connection error:'));


app.use(cors());

// logger middleware
app.use(morgan("dev"));

// parse request body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// router for HTTP requests
app.use("/api", router);

// calculate current date and pass to next middleware 
router.use("/moods", (req, res, next) => {
    let today = new Date();
    let dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    req.dateString = dateString;

    next();
});

// get mood data for the current date
router.get("/moods/today", (req, res) => {

    let { dateString } = req;

    Tally.findOne({date: dateString}, (err, tallyDocument) => {
        if(err) 
            return res.json({success: false, error: err, data: []});

        // if document for current date does not exist, create a new one
        if(!tallyDocument) {
            console.log(`No entries found for ${dateString}. Creating entry...`);

            let tallyObj = {
                date: dateString, 
                moods: moodList.map((entry) => { return {name: entry, tally: 0} }) 
            };

            // create document using schema
            let todayTallyCount = new Tally(tallyObj);

            console.log("Saving entry...");
            todayTallyCount.save((err) => {
                if (err) {
                    console.log("Could not create new entry.\n", err);
                    return res.json({success: false, error: `No entry for ${dateString}.`, data: []});
                }
                else {
                    console.log(`New entry for ${dateString} has been created.`);
                    return res.json({success: true, data: tallyObj});   
                }
            });
        }
        else if(tallyDocument.moods.length < moodList.length)
        {
            console.log(`Number of moods being measured for ${dateString} does not match the currently measurable moods. Adding missing entries...`);

            // create a list of moods for dataset and db
            let datasetMoods = tallyDocument.moods.map( (mood) => mood.name );

            // filter missing moods
            let missingMoods = moodList.filter( allowedMood => {
                for(let i=0; i < datasetMoods.length; i++) {
                    // if an allowed mood is in the dataset, don't include in missing list
                    if(allowedMood === datasetMoods[i])
                        return false;
                }
                // if it is, include it
                return true;
            });

            console.log("Adding the following missing moods:\n");

            let objMappedMissingMoods = missingMoods.map( mood => { return {name: mood, tally: 0} }); 
            console.log(objMappedMissingMoods);

            Tally.updateOne(
                { date: dateString }, 
                { $addToSet: { moods: { $each : objMappedMissingMoods } } }, 
                (err) => {
                    if(err) console.log("Could not add missing moods.\n", err);
                    else console.log("Added missing moods successfully.");
                    
                    return res.json({success: true, data: tallyDocument});
            });

        } // if entry exists, simply return it
        else return res.json({success: true, data: tallyDocument});
    });
});

// get moods for previous dates
router.get("/moods/previous", (req, res) => {
    let { dateString } = req;

    Tally.find({ date: { $not: { $eq: dateString } } }, (err, tallyDocumentList) => {
        if(err)
            return res.json({success: false, error: err, data: []});
        
        return res.send({success: true, data: tallyDocumentList});
    });
});

// update tally count for a particular mood 
router.post("/moods/today", (req, res) => {
    let today = new Date();
    let dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    let { mood } = req.body;
    
    let coloredMood = "\x1b[35m" + mood + "\x1b[0m";
    let coloredDate = "\x1b[36m" + dateString + "\x1b[0m";

    console.log(`Adding tally to ${coloredMood} for ${coloredDate}...`)

    Tally.findOneAndUpdate(
        { date: dateString, "moods.name": mood }, 
        { $inc: { "moods.$.tally": 1 } }, 
        {new: false}, 
        (err) => {
            if(err) return res.status(404).send();
            else return res.status(204).send();
    })
}); 

app.listen(API_PORT, () => { console.log(`Listening on port ${API_PORT}.`)});