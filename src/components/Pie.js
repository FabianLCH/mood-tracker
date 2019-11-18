import React from "react";
import { Stage, Layer } from "react-konva";

import { config } from "../utils/pieConfigOptions";

const Pie = (props) => {

    let { centerX, centerY, radius, padding, crustRadius } = config;

    return (
        <Stage width={ centerX + radius + (padding * 2) } height={centerY + radius + (padding * 2) + crustRadius }>
            <Layer>
                { props.slices }
            </Layer>
        </Stage>
    );

}

export default Pie;