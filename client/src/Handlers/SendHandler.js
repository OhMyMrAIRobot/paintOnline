import canvasState from "../Store/CanvasState";

export const sendMessage = (msg) => {
    canvasState.socket.send(JSON.stringify(msg))
}
