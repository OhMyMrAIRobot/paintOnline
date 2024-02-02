import React, {useEffect, useRef} from 'react';
import '../Style/Chat.css'
import {useParams} from "react-router-dom";

const Chat = ({socket, username, msgArray}) => {

    const inputRef = useRef("")
    const params = useParams();

    useEffect(() => {
        let chatContainer = document.getElementById('idchat');
        chatContainer.innerHTML = '';
        msgArray.forEach(function (message) {
            let messageElement = document.createElement('div');
            message.user === username ? messageElement.className = "msg author" : messageElement.className = "msg"
            chatContainer.appendChild(messageElement);

            let messageHeader = document.createElement('div');
            messageHeader.className = "msg_header";
            messageElement.appendChild(messageHeader);

            let authorSpan = document.createElement('span');
            authorSpan.className = "msg_author";
            authorSpan.textContent = message.user;
            messageHeader.appendChild(authorSpan);

            let timeSpan = document.createElement('span');
            timeSpan.className = "msg_time";
            timeSpan.textContent = "12:01";
            messageHeader.appendChild(timeSpan);

            let messageText = document.createElement('div');
            messageText.className = "msg_text";
            messageText.textContent =  message.text;
            messageElement.appendChild(messageText);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [msgArray]);

    const sendHandler = () => {
        // let tmp = inputRef.current.value;

        socket.current.send(JSON.stringify({
            id: params.id,
            username: username,
            method: 'message',
            data: inputRef.current.value,
        }))
        inputRef.current.value = "";
    }

    return (
        <div
            onKeyDown={e => {if (e.key === 'Enter' && inputRef.current.value !== "") sendHandler()}}
            className = "chat">
            <div className = "msg_container" id = "idchat"></div>
            <div className = "send_container">
                <input placeholder = "Enter" className = "msg_input" ref = {inputRef} type = 'text'></input>
                <button
                    onClick={() => {sendHandler()}}
                    className = "send_button">Send</button>
            </div>
        </div>
    );
};

export default Chat;