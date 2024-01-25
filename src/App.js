import React from 'react'
import './Style/App.css'
import Canvas from "./Components/Canvas";
import HorToolbar from "./Components/HorToolbar";
import VertToolbar from "./Components/VertToolbar";
import Chat from "./Components/Chat";


const App = () => {
    return(
        <div className = "app">
            <HorToolbar />
            <VertToolbar/>
            <Chat />
            <Canvas />
        </div>
    )
}

export default App;

