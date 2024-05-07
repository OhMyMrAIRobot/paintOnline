import {sendMessage} from "./SendHandler";
import canvasState from "../Store/CanvasState";

export const PushUndoHandler = () => {
    const serializer = new XMLSerializer();
    sendMessage(canvasState.socket,{
        method: 'pushUndo',
        id: canvasState.session,
        data: serializer.serializeToString(canvasState.canvas)
    })
}