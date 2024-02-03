import React from 'react';
import Modal from "./Modal";
import '../Style/UsernameModal.css'

const UsernameModal = ({modalActive, setModalActive, UsernameRef, connectionHandler}) => {
    
    const preConnectionHandler = () => {
        if (UsernameRef.current.value !== ""){
            setModalActive(false);
            connectionHandler();
            document.getElementById("hor").style.position = "inherit";
        }
        else{
            UsernameRef.current.style.borderColor = "red"
        }
    }
    
    return (
        <Modal active={modalActive} setActive={setModalActive} canClose={false}>
            <div className = "username_modal"
                 onKeyDown={e => {if (e.key === 'Enter') preConnectionHandler()}}
            >
                <p className = "username_text">Enter your username:</p>
                <input
                    autoFocus={true}
                    placeholder = "Username"
                    onChange={(e) => {
                        e.target.value !== '' ?
                            UsernameRef.current.style.borderColor = "green"
                            :
                            UsernameRef.current.style.borderColor = "red"
                    }}
                    className = "username_input" ref = {UsernameRef} type = 'text'/>

                <button className = "username_button"
                        onClick={(e) => preConnectionHandler()}
                >
                    Enter
                </button>
            </div>
        </Modal>
    );
};

export default UsernameModal;