import React, {useEffect, useRef} from 'react';
import '../Style/Chat.css'
import {useParams} from "react-router-dom";

const Chat = ({socket, username, msgArray}) => {

    const inputRef = useRef("")
    const params = useParams();

    useEffect(() => {
        console.log(msgArray);
    }, [msgArray]);

    return (
        <div className = "chat">
            <input ref = {inputRef} type = 'text'></input>
            <button
                onClick={() => {
                    socket.current.send(JSON.stringify({
                        id: params.id,
                        username: username,
                        method: 'message',
                        data: inputRef.current.value,
                    }))
                }}
                className = "send_button">Send</button>
        </div>
    );
};

export default Chat;