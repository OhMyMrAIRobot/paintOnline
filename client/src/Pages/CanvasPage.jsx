import React from 'react';
import HorToolbar from "../Components/HorToolbar";
import VertToolbar from "../Components/VertToolbar";
import Canvas from "../Components/Canvas";

const CanvasPage = () => {
    return (
        <>
            <HorToolbar />
            <VertToolbar/>
            <input id = 'test'/>
            <Canvas />
        </>
    );
};

export default CanvasPage;