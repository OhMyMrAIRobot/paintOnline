import React, {useRef} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";

const HorToolbar = () => {

    let font = "Arial";
    let size = 16;

    const ChangeFont = (e) => {
        let tmp = `${size}px ${font}`;
        toolState.setFont(tmp);
    }

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

            <input
                type = "number"
                min = {1}
                max = {50}
                defaultValue={16}
                onChange={e => {
                    size = e.target.value;
                    ChangeFont(e)
                    }
                }
            />

            <select
                onChange={e => {
                    font = e.target.value;
                    ChangeFont(e)
                    }
                }
            >
                <option value = "Arial">Arial</option>
                <option value = "Helvetica">Helvetica</option>
                <option value = "Times New Roman">Times New Roman</option>
            </select>
        </div>
    );
};

export default HorToolbar;