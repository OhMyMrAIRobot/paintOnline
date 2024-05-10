import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const CreateRoomHandler = () => {
    let id = uuidv4();
    return axios.post(`http://localhost:3000/createRoom`, {id: id});
}