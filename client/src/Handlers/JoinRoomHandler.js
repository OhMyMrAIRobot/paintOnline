import axios from "axios";

export const JoinRoomHandler = (jumpToRoom, input) => {
    let id = input.value;
    axios.get(`http://localhost:3000/getRoom?id=${id}`).then(response => {
        response.data ? jumpToRoom(id) : input.style.borderColor = "red";
    })
}