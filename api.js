const express = require("express");
const router = express.Router();

const Tally = require("./Tally");

// locally stored list of moods
const moodList = ["Angry", "Disgusted", "Sad", "Happy", "Surprised", "Bad", "Fearful"];

// calculate current date and pass to next middleware 
router.use("/moods", (req, res, next) => {
    let today = new Date();
    let dateObject = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };

    req.dateObject = dateObject;

    next();
});

router.use("/moods/today", (req, res, next) => {

    let { dateObject } = req;
    let formattedDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;

    Tally.findOne( { date: dateObject }, (err, tallyDocument) => {
        if(err) 
            return res.json({success: false, error: err, data: []});

        // if document for current date does not exist, create a new one
        if(!tallyDocument) {
            console.log(`No entries found for ${formattedDate}. Creating entry...`);

            let tallyObj = {
                date: dateObject, 
                totalEntries: req.method === "POST" ? 1 : 0,
                moods: moodList.map((entry) => { 
                    // for POST request with no existing document
                    if(req.method === "POST") {
                        let { mood } = req.body;

                        return { name: entry, tally: entry === mood ? 1 : 0 }
                    }

                    return {name: entry, tally: 0} 
                })
            };

            // create document using schema
            let todayTallyCount = new Tally(tallyObj);

            console.log("Saving entry...");
            todayTallyCount.save((err) => {
                if (err) {
                    console.log("Could not create new entry.\n", err);
                    return res.json({success: false, error: `No entry for ${formattedDate}.`, data: []});
                }
                else {
                    console.log(`New entry for ${formattedDate} has been created.`);
                    return req.method === "POST" ? res.status(204).send() : res.json({success: true, data: tallyObj});   
                }
            });
        }
        // if entry already exists, send to next middleware
        else {
            req.tallyDocument = tallyDocument;
            next();
        }
    });
});

// get mood data for the current date
router.get("/moods/today", (req, res) => {

    let { tallyDocument } = req;
    res.json({success: true, data: tallyDocument});
});

// update tally count for a particular mood 
router.post("/moods/today", (req, res) => {
    let { dateObject, tallyDocument } = req;
    let { mood } = req.body;
    
    let coloredMood = "\x1b[35m" + mood + "\x1b[0m";
    let coloredDate = "\x1b[36m" + `${dateObject.year}-${dateObject.month}-${dateObject.day}` + "\x1b[0m";

    let targetMoodIndex = tallyDocument.moods.findIndex( docMood => docMood.name === mood );

    // check if the specified mood is in the array
    if( targetMoodIndex === -1 ) {
        console.log(`No entry for ${coloredMood} in the database.`);
        return res.status(404).send();
    }

    console.log(`Adding tally to ${coloredMood} for ${coloredDate}...`)

    Tally.updateOne(
        { date: dateObject, "moods.name": mood }, 
        { $inc: { totalEntries: 1, "moods.$.tally": 1 } }, 
        {new: false}, 
        (err) => {
            if(err) return res.status(404).send();
            else return res.status(204).send();
    })
}); 

// get moods for previous dates
router.get("/moods/previous", (req, res) => {
    let { dateObject } = req;

    Tally.find({ date: { $not: { $eq: dateObject } } })
    .sort({ 'date': -1 })
    .limit(6)
    .exec( (err, tallyDocumentList) => {
        if(err)
            return res.json({success: false, error: err, data: []});
        
        return res.send({success: true, data: tallyDocumentList});
    });
});

module.exports = router;