import React from 'react';
import Modal from "./Modal";
import "../Style/JoinModal.css"

const JoinModal = ({ModalActive, setModalActive, inputRef, JoinRoomHandler}) => {
    return (
        <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
            <div className = "join_modal">
                <p className = "join_modal_text">Enter room's ID:</p>
                <input placeholder = "Enter" className = "join_modal_input" ref = {inputRef} type = 'text'
                       onChange={(e) => {
                           e.target.value !== '' ?
                               inputRef.current.style.borderColor = "green"
                               :
                               inputRef.current.style.borderColor = "red"
                       }}
                />
                <div className={"join_modal_button_container"}>
                    <button className = "join_modal_button exit" onClick={e => setModalActive(false)}>Cancel</button>
                    <button className = "join_modal_button join" onClick={JoinRoomHandler}>Join</button>
                </div>
            </div>
        </Modal>
    );
};

export default JoinModal;