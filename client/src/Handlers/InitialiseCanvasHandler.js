import canvasState from "../Store/CanvasState";
import axios from "axios";
import {PushUndoHandler} from "./PushUndoHandler";
import {LoadCanvas} from "./LoadCanvas";

export const InitialiseCanvas = () => {
    return axios.get(`http://localhost:3000/initialise?id=${canvasState.session}`)
        .then(response => {
            const saveHTML = response.data.canvas;

            if (saveHTML) {
                LoadCanvas(saveHTML)
            }

            document.title = `${canvasState.session} | ${canvasState.username}`;
        }
    )
}
