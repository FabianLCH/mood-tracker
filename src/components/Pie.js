import React from "react";
import { Stage, Layer, Circle } from "react-konva";

import { canvasOptions, config } from "../utils/pieConfigOptions";

const Pie = (props) => {

    let { centerX, centerY, radius, crustRadius, crustColor } = config;
    let { width, height } = canvasOptions;

    return (
        <Stage width={ width } height={ height }>
            <Layer>
                <Circle x={centerX} y={centerY} radius={radius + crustRadius} fill={crustColor} />
                { props.slices }
                { props.labels }
            </Layer>
        </Stage>
    );

}

export default Pie;