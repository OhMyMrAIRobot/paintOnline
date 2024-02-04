import {sendMessage} from "./SendHandler";

export const JoinRoomHandler = (socket, jumpToRoom, input) => {
    let id = input.value;
    sendMessage(socket,{id: id, method: "join"})

    socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        if (msg.method === 'checkRoom'){
            if (msg.connect)
                jumpToRoom(id)
            else
                input.style.borderColor = "red"
        }
    }
}