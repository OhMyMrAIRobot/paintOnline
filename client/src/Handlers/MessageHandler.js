import canvasState from "../Store/CanvasState";
import {drawHandler} from "./DrawHandler";

export const MessageHandler = (setMsgArr) => {
    canvasState.socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method){
            case 'connection':
                setMsgArr(prev => [...prev, {type: "connect", user: msg.username}])
                break;
            case 'draw':
                canvasState.pushToUndo(new XMLSerializer().serializeToString(canvasState.canvas))
                drawHandler(msg);
                break;
            case 'undo':
                canvasState.undo();
                break;
            case 'redo':
                canvasState.redo();
                break;
            case 'changeResolution':
                canvasState.pushToUndo(msg.oldCanvas)
                canvasState.setWidth(msg.width);
                canvasState.setHeight(msg.height);
                canvasState.setOldWidth(msg.width);
                canvasState.setOldHeight(msg.height);
                break;
            case 'changeBackground':
                console.log(msg);
                canvasState.pushToUndo(msg.oldCanvas)
                canvasState.setBackground(msg.color);
                canvasState.setOldBackground(msg.color);
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