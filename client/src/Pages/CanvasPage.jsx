import React, {useState} from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";
import Modal from "../Components/Modal";

const CanvasPage = () => {

    return (
        <>
            <HorToolbar />
            <div style = {{display: 'flex'}}>
                <VertToolbar/>
                <Canvas />
            </div>
            <input id = 'test' style = {{display: 'none', position: 'absolute'}}/>
        </>
    );
};

export default CanvasPage;