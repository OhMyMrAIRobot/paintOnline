import React, {useEffect, useRef, useState} from 'react';
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
        canvasState.socket.send(JSON.stringify({
            id: canvasState.session,
            method: 'changeResolution',
            width: widthRef.current.value,
            height: heightRef.current.value,
        }))
    }

    const changeBackgroundHandler = (color) => {
        canvasState.socket.send(JSON.stringify({
            id: canvasState.session,
            method: 'changeBackground',
            color: color,
        }))
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
                defaultValue = "0"
            />

            <input
                ref = {heightRef}
                type = "number"
                min = {100}
                max = {5000}
                defaultValue = "0"
            />

            <button
                onClick={() => changeSizeHandler()}
            >
                change
            </button>

            <input
                type = "color"
                defaultValue = "#FFFFFF"
                onChange={(e) => changeBackgroundHandler(e.target.value)}
            />

        </div>
    );
};

export default HorToolbar;