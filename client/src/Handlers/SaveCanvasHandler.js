import {sendMessage} from "./SendHandler";
import canvasState from "../Store/CanvasState";

export const SaveCanvasHandler = () => {
    if (canvasState.username) {
        const serializer = new XMLSerializer();
        sendMessage(canvasState.socket,{
            method: 'saveCanvas',
            id: canvasState.session,
            canvas: serializer.serializeToString(canvasState.canvas)
        })
    }
}
