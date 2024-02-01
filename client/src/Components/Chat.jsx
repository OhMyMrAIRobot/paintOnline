import React, {useEffect, useRef} from 'react';
import '../Style/Chat.css'
import {useParams} from "react-router-dom";

const Chat = ({socket, username, msgArray}) => {

    const inputRef = useRef("")
    const params = useParams();

    useEffect(() => {
        console.log(msgArray);
        let chatContainer = document.getElementById('idchat');
        chatContainer.innerHTML = '';
        msgArray.forEach(function (message) {
            console.log(message);
            let messageElement = document.createElement('div');
            message.user === username ? messageElement.className = "msg author" : messageElement.className = "msg"
            messageElement.textContent = message.user + ': ' + message.text;
            chatContainer.appendChild(messageElement);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [msgArray]);

    return (
        <div className = "chat">
            <div id = "idchat">
            </div>
            <div className = "send_container">
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
        </div>
    );
};

export default Chat;