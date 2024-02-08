import axios from "axios";

export const CreateRoomHandler = (jumpToRoom) => {
    let id = (+ new Date).toString(16)
    axios.post(`http://localhost:3000/createRoom?id=${id}`).then(response =>
        response.status === 200 ? jumpToRoom(id) : console.log('error'))
}