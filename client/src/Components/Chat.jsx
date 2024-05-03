import React, {useEffect, useRef} from 'react';
import '../Style/Chat.css'
import Draggable from "react-draggable";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";

const ChangeFormat =(min) => {
    if (min < 10)
        return `0${min}`
    else
        return min
}

// Сообщение от пользователя
const createMessage = (message, chatContainer) => {
    let messageElement = document.createElement('div');
    message.user === canvasState.username ? messageElement.className = "msg author" : messageElement.className = "msg"
    chatContainer.appendChild(messageElement);

    let messageHeader = document.createElement('div');
    messageHeader.className = "msgHeader";
    messageElement.appendChild(messageHeader);

    let authorSpan = document.createElement('span');
    authorSpan.className = "msgAuthor";
    message.user === canvasState.username ? authorSpan.textContent = "You" : authorSpan.textContent = message.user;
    messageHeader.appendChild(authorSpan);

    let timeSpan = document.createElement('span');
    timeSpan.className = "msgTime";
    timeSpan.textContent = message.time.hour + ":" + ChangeFormat(message.time.minute);
    messageHeader.appendChild(timeSpan);

    let messageText = document.createElement('div');
    messageText.className = "msgText";
    messageText.textContent =  message.text;
    messageElement.appendChild(messageText);
}

// Системное сообщение
const createSystemMessage = (message, chatContainer) => {
    let messageElement = document.createElement('div');
    messageElement.className = "msgSystemContainer";
    chatContainer.appendChild(messageElement);

    let nameSpan = document.createElement('span');
    nameSpan.className = "msgSystem";
    message.type === 'connect' ?
        nameSpan.textContent = `User ${message.user} has connected!`
    :
        nameSpan.textContent = `User ${message.user} disconnected!`
    ;
    messageElement.appendChild(nameSpan);
}

const Chat = ({msgArray, chatActive}) => {

    const inputRef = useRef(null)
    const chatRef = useRef(null)

    // обновление сообщений
    useEffect(() => {

        // Новое сообщение
        if (!chatActive)
            document.getElementById('idMsgSpan').style.opacity = '1';

        // Отрисовка сообщений
        let chatContainer = document.getElementById('Chat');
        chatContainer.innerHTML = '';

        msgArray.forEach(function (message) {
            if (message.type === "message")
                createMessage(message, chatContainer);
            else
                createSystemMessage(message, chatContainer);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [msgArray]);

    // Отправка сообщения
    const sendMessageHandler = () => {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        sendMessage(canvasState.socket,{
            method: 'message',
            id: canvasState.session,
            username: canvasState.username,
            data: inputRef.current.value,
            time: {hour: currentHour, minute: currentMinute}
        })
        inputRef.current.value = "";
    }

    return (
        <Draggable
            onStart={() => {chatRef.current.style.transition = '0s'}}
            onStop={() => {chatRef.current.style.transition = '0.5s'}}
        >
            <div
                ref = {chatRef}
                onKeyDown={e => {
                    if (e.key === 'Enter' && inputRef.current.value !== "")
                        sendMessageHandler()
                }}
                className = {chatActive ? "chat chatActive" : "chat"}>
                <div className = "msgContainer" id = "Chat"></div>
                <div className = "sendContainer">
                    <input placeholder = "Message..." className = "msgInput" ref = {inputRef} type = 'text'></input>
                    <button
                        onClick={() => {sendMessageHandler()}}
                        className = "sendButton">Send</button>
                </div>
            </div>
        </Draggable>

    );
};

export default Chat;