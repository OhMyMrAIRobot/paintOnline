import canvasState from "../Store/CanvasState";

export const LoadCanvas = (saveHTML) => {
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

const rgbToHex = (rgb) => {
    const rgbArray = rgb.match(/\d+/g);

    return "#" +
        ("0" + parseInt(rgbArray[0], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgbArray[2], 10).toString(16)).slice(-2);
}