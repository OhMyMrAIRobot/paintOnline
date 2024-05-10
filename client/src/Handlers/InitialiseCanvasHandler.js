import canvasState from "../Store/CanvasState";
import axios from "axios";
import {LoadCanvas} from "./LoadCanvas";

export const InitialiseCanvas = () => {
    return axios.get(`http://localhost:3000/initialise?id=${canvasState.session}`)
        .then(response => {
            console.log(response.data.Canvas)
            const saveHTML = response.data.Canvas;

            if (saveHTML) {
                LoadCanvas(saveHTML)
            }

            document.title = `${canvasState.session} | ${canvasState.username}`;
        }
    )
}
