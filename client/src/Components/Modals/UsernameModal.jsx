import React, {useRef} from 'react';
import Modal from "./Modal";
import '../../Resources/Styles/UsernameModal.css'
import canvasState from "../../Store/CanvasState";

const UsernameModal = ({modalActive, setModalActive}) => {

    const usernameRef = useRef(null)

    const preConnectionHandler = () => {
        if (usernameRef.current.value !== ""){
            canvasState.setUsername(usernameRef.current.value)
            setModalActive(false);
        }
        else{
            usernameRef.current.style.borderColor = "red"
        }
    }
    
    return (
        <Modal active={modalActive} setActive={setModalActive} canClose={false}>
            <div className = "usernameModal"
                 onKeyDown={e => {
                     if (e.key === 'Enter') preConnectionHandler()}
                }
            >
                <p className = "usernameText">Enter username:</p>
                <input
                    className = "usernameInput" ref = {usernameRef} type = 'text'
                    autoFocus={true}
                    placeholder = "Username"
                    onChange={(e) => {
                        e.target.value !== '' ?
                            usernameRef.current.style.borderColor = "green"
                            :
                            usernameRef.current.style.borderColor = "red"
                    }}
                    />

                <button
                    className = "usernameButton"
                    onClick={(e) => preConnectionHandler()}
                >
                    Enter
                </button>
            </div>
        </Modal>
    );
};

export default UsernameModal;