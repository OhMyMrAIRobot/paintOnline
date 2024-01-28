import React, {useRef} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";

const HorToolbar = () => {

    const fontSizeRef = useRef();
    const fontFamilyRef = useRef();

    const ChangeFont = (e) => {
        toolState.setFont(`${fontSizeRef.current.value}px ${fontFamilyRef.current.value}`);
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
                ref = {fontSizeRef}
                type = "number"
                min = {1}
                max = {50}
                defaultValue={16}
                onChange={e => {
                    ChangeFont(e)
                    }
                }
            />

            <select
                ref={fontFamilyRef}
                onChange={e => {
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