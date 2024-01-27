import React from 'react'
import './Style/App.css'
import Canvas from "./Components/Canvas";
import HorToolbar from "./Components/HorToolbar";
import VertToolbar from "./Components/VertToolbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
    return(
        <BrowserRouter>
            <div className = "app">
                <Routes>
                    <Route path = '/:id' element={
                        <>
                        <HorToolbar />
                        <VertToolbar/>
                        <input id = 'test'/>
                        <Canvas />
                        </>
                    }
                    />
                    <Route path = '/' element={
                        <>
                            hello
                        </>
                    }/>
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default App;

