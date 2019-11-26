import React, { useState, useEffect } from "react";

import { Shape, Text } from "react-konva";
import { config, data } from "../utils/pieConfigOptions";

import Pie from "../components/Pie";

const MoodPieContainer = () => {

    let { centerX, centerY, radius } = config;

    // state configuration 
    const [ pieSlices, updateSlices ] = useState([]);
    const [ labelNodes, updateLabels ] = useState([]);
    const [ currentMood, setCurrentMood ] = useState({ name: "Neutral", color: "#DCDCDB"});
    
    // generate slices list before component mounts
    useEffect(() => {
        
        // calculate angle of each slice
        let sliceAngle = 2 * Math.PI / data.length;
        let sliceStartAngle = 0;

        // build the slices
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
                    onTap={() => { setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor}) } }
                />
            );
        })
        
        //reset start angle
        sliceStartAngle = 0;

        // get label config options
        let { labelRadiusModifier, labelSize, labelFontColor } = config;

        // build the slice labels
        let labelRadius = labelRadiusModifier * radius;

        let sliceLabels = data.map( (currentSlice, index) => {
            let { offsetX, offsetY } = currentSlice.labelPosition;

            let dx;
            let dy;

            let labelAngle = sliceStartAngle + (sliceAngle * 0.55);
             
            let angleSector = Math.floor(labelAngle / (Math.PI / 2));
            let angleRemainder = labelAngle % (Math.PI / 2);
            
            switch(angleSector) {
                case(0):
                    dx = Math.cos(angleRemainder) * labelRadius;
                    dy = Math.sin(angleRemainder) * labelRadius;
                    break;
                case(1):
                    dx = -Math.sin(angleRemainder) * labelRadius;
                    dy = Math.cos(angleRemainder) * labelRadius;
                    break;
                case(2):
                    dx = -Math.cos(angleRemainder) * labelRadius;
                    dy = -Math.sin(angleRemainder) * labelRadius;
                    break;
                case(3):
                    dx = Math.sin(angleRemainder) * labelRadius;
                    dy = -Math.cos(angleRemainder) * labelRadius;
                    break;
                default:
                    dx = 0;
                    dy = 0;
                    break;
            }
            

            sliceStartAngle += sliceAngle;

            // text color and size will be set through config options 
            return (
                <Text
                    key={index}
                    x={centerX + dx + offsetX}
                    y={centerY + dy + offsetY}

                    text={currentSlice.name} 
                    fontSize={labelSize} 
                    fill={labelFontColor}

                    onClick={() => { setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor}) } }
                    onTap={() => { setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor}) } }
                />
            );

        });

        // add slices and labels to pie
        updateSlices(sliceList);
        updateLabels(sliceLabels);

    }, [centerX, centerY, radius]);

    return (
        <div className="main-container">
            <p>This is the Mood Tracking Pie Chart. Click on a portion of the pie to indicate your mood.</p>
            <Pie slices={pieSlices} labels={labelNodes}/>
            <h3>You are feeling <span className="current-feeling" style={{backgroundColor: currentMood.color}}>{currentMood.name}</span></h3>
        </div>
    );

}

export default MoodPieContainer;

