import React, {useRef} from 'react';
import '../Style/Toolbar.css'
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";

const HorToolbar = () => {

    const fontSizeRef = useRef();
    const fontFamilyRef = useRef();

    const ChangeFontHandler = () => {
        toolState.setFont(`${fontSizeRef.current.value}px ${fontFamilyRef.current.value}`);
    }

    const widthRef = useRef();
    const heightRef = useRef();

    const changeSizeHandler = () => {
        canvasState.setWidth(widthRef.current.value);
        canvasState.setHeight(heightRef.current.value);
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
                onChange={() => {
                    ChangeFontHandler()
                    }
                }
            />

            <select
                ref={fontFamilyRef}
                onChange={() => {
                    ChangeFontHandler()
                    }
                }
            >
                <option value = "Arial">Arial</option>
                <option value = "Helvetica">Helvetica</option>
                <option value = "Times New Roman">Times New Roman</option>
            </select>

            <input
                ref = {widthRef}
                type = "number"
                min = {100}
                max = {5000}
                defaultValue={1280}
            />

            <input
                ref = {heightRef}
                type = "number"
                min = {100}
                max = {5000}
                defaultValue={720}
            />

            <button
                onClick={() => changeSizeHandler()}
            >change</button>



        </div>
    );
};

export default HorToolbar;