import axios from "axios";

export const CheckIsRoomValid = (id) => {
    return axios.get(`http://localhost:3000/getRoom?id=${id}`)
}