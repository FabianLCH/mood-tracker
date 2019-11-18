import React, { useState, useEffect } from "react";

import { Shape } from "react-konva";
import { config, data } from "../utils/pieConfigOptions";

import Pie from "../components/Pie";

const MoodPieContainer = () => {

    let { centerX, centerY, radius } = config;

    // ----- const [ areSlicesStored, toggleSlicesStored ] = useState(false);
    const [ pieSlices, updateSlices ] = useState([]);
    const [ currentMood, setCurrentMood ] = useState({ name: "Neutral", color: "#DCDCDB"});
    
    // generate slices list before component mounts
    useEffect(() => {

        // calculate angle of each slice
        let sliceAngle = 2 * Math.PI / data.length;
        let sliceStartAngle = 0;

        let sliceList = data.map( (currentSlice, index) => {

            // calculate arc begin and end angles
            let beginAngle = sliceStartAngle;
            let endAngle = sliceStartAngle + sliceAngle;

            // update current start angle before returning
            sliceStartAngle += sliceAngle;

            return (
                <Shape key={index} fill={currentSlice.portionColor} 
                    sceneFunc={ function(ctx) {

                        ctx.beginPath();
                        ctx.moveTo(centerX, centerY);
                        ctx.arc(centerX, centerY, radius, beginAngle, endAngle, false);
                        ctx.lineTo(centerX, centerY);
                        ctx.closePath();
                        
                        ctx.fillStrokeShape(this);
                    }}
                    onClick={() => { setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor}) } }
                />
            );
        })
        
        // add slice list to state
        updateSlices(sliceList);

        // set areSlicesStored flag to true
        // ---- toggleSlicesStored(true);
    }, []);

    return (
        <div className="main-container">
            <p>This is the Mood Tracking Pie Chart. Click on a portion of the pie to indicate your mood.</p>
            <Pie slices={pieSlices}/>
            <h3>You are feeling <span className="current-feeling" style={{backgroundColor: currentMood.color}}>{currentMood.name}</span></h3>
        </div>
    );

}

export default MoodPieContainer;

