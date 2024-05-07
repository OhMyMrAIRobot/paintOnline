import canvasState from "../Store/CanvasState";
import axios from "axios";

export const InitialiseCanvas = () => {
    axios.get(`http://localhost:3000/initialise?id=${canvasState.session}`)
        .then(response => {
            const saveHTML = response.data.canvas; // Строка HTML

            if (saveHTML) {
                console.log('intiialise')
                const parser = new DOMParser();
                const newSVGElement = parser.parseFromString(saveHTML, 'image/svg+xml').documentElement;
                const parent = canvasState.canvas.parentNode;
                parent.removeChild(canvasState.canvas);
                parent.appendChild(newSVGElement);
                canvasState.setCanvas(newSVGElement);
                canvasState.setWidth(parseInt(window.getComputedStyle(canvasState.canvas).width));
                canvasState.setHeight(parseInt(window.getComputedStyle(canvasState.canvas).height));
                canvasState.setBackground(rgbToHex(window.getComputedStyle(canvasState.canvas).backgroundColor));
            }

            document.title = `${canvasState.session} | ${canvasState.username}`;
        }
    )
}

function rgbToHex(rgb) {
    const rgbArray = rgb.match(/\d+/g);

    return "#" +
        ("0" + parseInt(rgbArray[0], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[2], 10).toString(16)).slice(-2);
}