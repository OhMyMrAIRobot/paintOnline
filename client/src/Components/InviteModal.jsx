import React from 'react';
import Modal from "./Modal";
import canvasState from "../Store/CanvasState";
import '../Style/InviteModal.css'

const InviteModal = ({ModalActive, setModalActive}) => {
    return (
        <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
        <div className = "invite_modal">
                <p className = "invite_text">Invite your friends!</p>
                <div className = "invite_input_container">
                    <input className = "invite_input" type={'text'} defaultValue={window.location.href} readOnly={true}/>
                    <button className = "copy_button" onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy</button>
                </div>

                <div className = "invite_input_container">
                    <input className = "invite_input" type={'text'} defaultValue={canvasState.session} readOnly={true}/>
                    <button className = "copy_button" onClick={() => navigator.clipboard.writeText(canvasState.session)}>Copy</button>
                </div>

                <button className = "close_invite_modal" onClick={() => setModalActive(false)}>Close</button>
            </div>
        </Modal>
    );
};

export default InviteModal;