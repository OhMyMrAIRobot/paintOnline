import canvasState from "../Store/CanvasState";
import {drawHandler} from "./DrawHandler";

export const MessageHandler = (setMsgArr, setWidth, setHeight) => {
    canvasState.socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method){
            case 'connection':
                setMsgArr(prev => [...prev, {type: "connect", user: msg.username}])
                break;
            case 'draw':
                drawHandler(msg);
                break;
            case 'pushUndo':
                canvasState.pushToUndo(msg.data)
                break;
            case 'undo':
                canvasState.undo();
                break;
            case 'redo':
                canvasState.redo();
                break;
            case 'changeResolution':
                canvasState.setWidth(msg.width);
                canvasState.setHeight(msg.height);
                setWidth(msg.width);
                setHeight(msg.height)
                break;
            case 'changeBackground':
                canvasState.setBackground(msg.color);
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