import canvasState from "../Store/CanvasState";
import {drawHandler} from "./DrawHandler";
import {sendMessage} from "./SendHandler";
import {SaveCanvasHandler} from "./SaveCanvasHandler";
import {PushUndoHandler} from "./PushUndoHandler";

export const MessageHandler = (setMsgArr) => {
    canvasState.socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method){
            case 'connection':
                setMsgArr(prev => [...prev, {type: "connect", user: msg.username}])
                break;
            case 'draw':
                PushUndoHandler();
                drawHandler(msg);
                SaveCanvasHandler()
                break;
            case 'pushUndo':
                canvasState.pushToUndo(msg.data)
                break;
            case 'undo':
                canvasState.undo();
                SaveCanvasHandler()
                break;
            case 'redo':
                canvasState.redo();
                SaveCanvasHandler()
                break;
            case 'changeResolution':
                canvasState.setWidth(msg.width);
                canvasState.setHeight(msg.height);
                SaveCanvasHandler()
                break;
            case 'changeBackground':
                canvasState.setBackground(msg.color);
                SaveCanvasHandler()
                break;
            case 'message':
                setMsgArr(prev => [...prev, {
                    type: 'message',
                    user: msg.username,
                    text: msg.data,
                    time: {hour: msg.time.hour, minute: msg.time.minute}
                }])
                break;
            case 'close':
                setMsgArr(prev => [...prev, {type: "disconnect", user: msg.username}])
                break;
            default:
                break;
        }
    }
}