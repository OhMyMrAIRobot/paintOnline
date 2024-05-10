import React from 'react';
import Modal from "./Modal";
import canvasState from "../Store/CanvasState";
import '../Resources/Styles/InviteModal.css'

const InviteModal = ({ModalActive, setModalActive}) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setModalActive(false);
            removeEventListener();
        }
    }

    document.getElementById('root').addEventListener('keydown', handleKeyPress);

    const removeEventListener = () => {
        document.getElementById('root').removeEventListener('keydown', handleKeyPress);
    }

    return (
        <Modal active={ModalActive} setActive={setModalActive} canClose={true}>
        <div
            className = "inviteModal">
                <p className = "inviteText">Invite your friends!</p>
                <div className = "inviteInputContainer">
                    <input
                        className = "inviteInput"
                        autoFocus={true}
                        type={'text'}
                        defaultValue={window.location.href}
                        readOnly={true}
                    />
                    <button
                        className = "copyButton"
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                    >
                        Copy
                    </button>
                </div>

                <div className = "inviteInputContainer">
                    <input
                        className = "inviteInput"
                        type={'text'}
                        defaultValue={canvasState.session}
                        readOnly={true}
                    />
                    <button
                        className = "copyButton"
                        onClick={() => navigator.clipboard.writeText(canvasState.session)}
                    >
                        Copy
                    </button>
                </div>

                <button className = "closeInvite" onClick={() => setModalActive(false)}>Close</button>
            </div>
        </Modal>
    );
};

export default InviteModal;