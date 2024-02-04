import canvasState from "../Store/CanvasState";
import {sendMessage} from "./SendHandler";

export const preInitialiseCanvasHandler = (socket, params, setCanvasUrl, navigate) => {
    socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.method === 'checkRoom'){
            if (!msg.connect){
                navigate(`/`)
            }
            else{
                canvasState.setSocket(socket)
                canvasState.setSession(params.id);

                sendMessage(canvasState.socket,{id: params.id, method: 'getCanvas'})

                canvasState.socket.onmessage = (event) => {
                    let msg = JSON.parse(event.data);
                    if (msg.method === 'getCanvas') {
                        setCanvasUrl(msg.url);
                    }
                }
            }
        }
    }
}