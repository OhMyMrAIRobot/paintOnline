import {sendMessage} from "./SendHandler";

export const JoinRoomHandler = (socket, jumpToRoom, inputRef) => {
    console.log("input:" , inputRef)
    let id = inputRef.current.value;
    sendMessage(socket,{id: id, method: "join"})

    socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.method === 'checkRoom'){
            if (msg.connect)
                jumpToRoom(id)
            else
                inputRef.current.style.borderColor = "red"
        }
    }
}