import axios from "axios";

export const CreateRoomHandler = () => {
    let id = (+ new Date).toString(16)
    return axios.post(`http://localhost:3000/createRoom`, {id: id});
}