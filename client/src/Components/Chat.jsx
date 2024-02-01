import React from 'react';
import '../Style/Chat.css'

const Chat = () => {
    return (
        <div className = "chat">
            <input type = 'text'></input>
            <button className = "send_button">Send</button>
        </div>
    );
};

export default Chat;