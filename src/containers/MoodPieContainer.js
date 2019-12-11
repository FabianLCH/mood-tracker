import React, { useState, useEffect } from "react";
import { Shape, Text } from "react-konva";
import axios from "axios";
import { Howl } from 'howler';

import { config, data } from "../utils/pieConfigOptions";

import Pie from "../components/Pie";

// set the volume for audio

const howlConfig = { 
    src: ['pongblipg5.mp3', 'pongblipg5.wav', 'pongblipg5.ogg'],
    volume: 0.2
};

const playBeep = () => {
    let doubleBeep = new Howl(howlConfig);
    doubleBeep.play();
}

const neutral = { name: "Neutral", color: "#DCDCDB"};
const statusMessages = {
    "awaiting": "You have not selected a mood yet.",
    "submitted": "Saving your response...",
    "failed": "Oops! It looks like something went wrong.",
    "recorded": "Thank you! Your response has been recorded"
}

const recordResponse = (entryStateCallback, selectedMood) => {
    entryStateCallback("submitted");

    axios.post("/api/moods/today", { mood: selectedMood.name }).then(
        (res) => {
            entryStateCallback("recorded");
            setTimeout( () => { window.location = "/statistics"}, 3000);
        }
    ).catch(
        (error) => {
            entryStateCallback("failed");
            console.log("Could not record entry,\n", error);
        }
    )
}

const MoodPieContainer = () => {

    let { centerX, centerY, radius } = config;

    // state configuration 
    const [ pieSlices, updateSlices ] = useState([]);
    const [ labelNodes, updateLabels ] = useState([]);
    const [ currentMood, setCurrentMood ] = useState(neutral);
    const [ entryStatus, setEntryStatus ] = useState("awaiting");
    
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
                    onClick={() => { 
                        setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor});
                        setEntryStatus("selected");
                        playBeep();
                    } }
                    onTap={() => { 
                        setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor}) 
                        setEntryStatus("selected");
                        playBeep();
                    } }
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

                    onClick={() => { 
                        setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor});
                        setEntryStatus("selected");
                        playBeep();
                    }}
                    onTap={() => { 
                        setCurrentMood({name: currentSlice.name, color: currentSlice.portionColor});
                        setEntryStatus("selected"); 
                        playBeep();
                } }
                />
            );

        });

        // add slices and labels to pie
        updateSlices(sliceList);
        updateLabels(sliceLabels);

    }, [centerX, centerY, radius]);

    return (
        <div className="main-container">
            <section className="top-section">
                <span className="table-message">Let us know how you feel by choosing a slice of the pie!</span><a href="/statistics"><button>Go to statistics <i className="fas fa-angle-right"></i></button></a>
            </section>
            <Pie slices={pieSlices} labels={labelNodes}/>
            <h3 className="current-feeling" style={{backgroundColor: currentMood.color}}>You feel {currentMood.name}</h3>
            { entryStatus === "selected" ?
                (    
                <div className="entry-message">
                    <span className="confirm-message">Is this correct?</span> 
                    <button className="pie-button" onClick={ () => { recordResponse(setEntryStatus, currentMood) } }>Yes</button> 
                    <button className="pie-button" onClick={ () => { 
                        setCurrentMood(neutral); 
                        setEntryStatus("awaiting"); 
                        } }>No</button>
                </div>
                ) : 
                (
                <div className="entry-message">
                    { statusMessages[entryStatus] }
                    { entryStatus === "failed" && <button className="pie-button" onClick={ () => { recordResponse(setEntryStatus, currentMood) } }>Try again</button> }
                </div>
                )   
            }
 
        
            

        </div>
    );

}

export default MoodPieContainer;

