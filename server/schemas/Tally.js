const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Tally = new Schema({
    date: {
        year: Number,
        month: Number,
        day: Number
    },
    totalEntries: Number,
    moods: [{
        name: String,
        tally: Number
    }]
});

module.exports = mongoose.model("Tally", Tally, "tallies");