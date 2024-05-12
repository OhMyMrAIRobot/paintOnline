import React from 'react'
import './Resources/Styles/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CanvasPage from "./Pages/CanvasPage";

const App = () => {
    return(
        <BrowserRouter>
            <div className = "app">
                <Routes>
                    <Route path = '/:id' element={<CanvasPage/>} />
                    <Route path = '/' element={<MainPage/>} />
                </Routes>
            </div>
        </BrowserRouter>

    )
}

export default App;

