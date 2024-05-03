import React, {useRef} from 'react';
import Modal from "./Modal";
import "../Style/JoinModal.css"
import {CheckIsRoomValid} from "../Handlers/CheckIsRoomValid";

const JoinModal = ({ModalActive, setModalActive, jumpToRoom}) => {

    const inputRef = useRef(null);

    const joinRoom = () => {
        const id = inputRef.current.value ?? 0;
        CheckIsRoomValid(id)
            .then(() => {
                jumpToRoom(id)
            })
            .catch((e) => {
                inputRef.current.style.borderColor = "red"
                console.log(e);
            })
    }

    return (
        <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
            <div className = "joinModal"
                 onKeyDown={e => {
                     if (e.key === 'Enter') joinRoom();
                     else if (e.key === 'Escape') setModalActive(false)
                 }}
            >
                <p className = "joinModalText">Enter room's ID:</p>
                <input
                    placeholder = "12345qwer"
                       onChange={(e) => {
                           e.target.value !== '' ?
                               inputRef.current.style.borderColor = "green"
                               :
                               inputRef.current.style.borderColor = "red"
                       }}
                    className = "joinModalInput" ref = {inputRef} type = 'text'
                />

                <div className="joinModalButtons">
                    <button
                        className = "joinModalButton exit"
                        onClick={e => setModalActive(false)}>Cancel
                    </button>
                    <button
                        className = "joinModalButton join"
                        onClick={() => joinRoom()}>Join
                    </button>
                </div>

            </div>
        </Modal>
    );
};

export default JoinModal;