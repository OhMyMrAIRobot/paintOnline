import {sendMessage} from "./SendHandler";

export const CreateRoomHandler = (jumpToRoom, socket, ) => {
    let id = (+ new Date).toString(16)
    jumpToRoom(id);
    sendMessage(socket, {id: id, method: "createRoom"})
    socket.close(1000);
}