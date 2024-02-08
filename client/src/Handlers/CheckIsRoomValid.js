import axios from "axios";

export const checkIsRoomValid = (id, navigate) => {
    axios.get(`http://localhost:3000/getRoom?id=${id}`).then(response => {
        if (!response.data){
            navigate(`/`);
        }
    })
}