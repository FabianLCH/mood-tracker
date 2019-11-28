const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tally = new Schema({
    date: String,
    totalEntries: Number,
    moods: [{
        name: String,
        tally: Number
    }]
});

module.exports = mongoose.model("Tally", Tally, "tallies");