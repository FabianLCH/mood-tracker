import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

import { moodColorMapping } from "../utils/pieConfigOptions";

const barChartOptions = {
    responsive: true,
    legend: { display: false },
    layout: { padding: 25 },
    scales: {
        xAxes: [{
            ticks: {
                fontColor: "#3E2312",
                fontSize: 17 
            },
            gridLines: { 
                display: false, 
                color: "rgba(0, 0, 0, 0.2)" 
            }
        }],
        yAxes: [{
            display: false,
            ticks: {
                min: 0,
                stepSize: 1,
                fontColor: "rgba(0, 0, 0, 1)" },
            gridLines: { 
                display: false, 
                color: "rgba(0, 0, 0, 0.2)" 
            }
        }]
    }
}

// fetch mood tally counts from database
const fetchMoodData = (updateDataFunction) => {
    axios.get("http://localhost:4000/api/moods").then(
        (resp) => {
            let { moods } = resp.data.data;

            let moodLabels = moods.map( mood => mood.name);
            let moodColors = moods.map( mood => (moodColorMapping[mood.name] ? moodColorMapping[mood.name] : "#FFF") );
            let moodTallies = moods.map( mood => mood.tally);

            let barData = {
                labels: moodLabels,
                datasets: [{
                    label: "Tally Count",
                    backgroundColor: moodColors,
                    data: moodTallies
                }]
            };

            updateDataFunction(barData);
        }
    ).catch( (err) => {
        console.log("Could not fetch data.\n", err);
    });
};


const MoodBarChartContainer = (props) => {

    const [barChartData, setBarChartData] = useState({});

    useEffect(() => {
        // get the data from the db
        fetchMoodData(setBarChartData);

        // fetch data every 10s
        let updateInterval = setInterval( () => { fetchMoodData(setBarChartData) }, 10000);

        // on unmount, clear interval to stop callbacks
        return () => { 
            console.log("Clearing interval...")
            clearInterval(updateInterval) }; 
    }, []);

    return (
    <div className="outer-bar-chart-container">
        <div className="inner-bar-chart-container">
            <div className="bar-chart-top">How is everyone else feeling?</div>
            <Bar 
                data={barChartData}
                options={barChartOptions}
            />
        </div>
    </div>
    );
};

export default MoodBarChartContainer;