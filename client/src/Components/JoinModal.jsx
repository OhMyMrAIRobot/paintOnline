import React, {useEffect} from 'react';
import Modal from "./Modal";
import "../Style/JoinModal.css"
import {JoinRoomHandler} from "../Handlers/JoinRoomHandler";

const JoinModal = ({ModalActive, setModalActive, inputRef, socket, jumpToRoom}) => {

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [ModalActive]);

    return (
        <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
            <div className = "join_modal"
                 onKeyDown={e => {
                     if (e.key === 'Enter') JoinRoomHandler(socket.current, jumpToRoom, inputRef.current);
                     else if (e.key === 'Escape') setModalActive(false)
                 }}
            >
                <p className = "join_modal_text">Enter room's ID:</p>
                <input
                    placeholder = "Enter"
                       onChange={(e) => {
                           e.target.value !== '' ?
                               inputRef.current.style.borderColor = "green"
                               :
                               inputRef.current.style.borderColor = "red"
                       }}
                    className = "join_modal_input" ref = {inputRef} type = 'text'
                />

                <div className={"join_modal_button_container"}>
                    <button className = "join_modal_button exit" onClick={e => setModalActive(false)}>Cancel</button>
                    <button className = "join_modal_button join" onClick={() => JoinRoomHandler(socket.current, jumpToRoom, inputRef.current)}>Join</button>
                </div>

            </div>
        </Modal>
    );
};

export default JoinModal;