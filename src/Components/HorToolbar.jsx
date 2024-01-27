import React from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";

const HorToolbar = () => {
    return (
        <div className = "toolbar-w">
            <input
                type = "number"
                min = {1}
                max = {100}
                defaultValue={1}
                onChange={e => toolState.setLineWidth(e.target.value)}
            />

            <input
                type = "color"
                defaultValue = "#000000"
                onChange={e => toolState.setStrokeColor(e.target.value)}
            />

            <input
                type = "color"
                defaultValue = "#FFFFFF"
                onChange={e => toolState.setFillColor(e.target.value)}
            />
        </div>
    );
};

export default HorToolbar;