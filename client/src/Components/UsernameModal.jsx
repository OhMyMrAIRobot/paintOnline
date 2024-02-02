import React from 'react';
import Modal from "./Modal";
import '../Style/UsernameModal.css'

const UsernameModal = ({modalActive, setModalActive, UsernameRef, connectionHandler}) => {
    return (
        <Modal active={modalActive} setActive={setModalActive} canClose={false}>
            <div className = "username_modal">
                <p className = "username_text">Enter your username:</p>
                <input
                    onChange={(e) => {
                        e.target.value !== '' ?
                            UsernameRef.current.style.borderColor = "green"
                            :
                            UsernameRef.current.style.borderColor = "red"

                    }}
                    className = "username_input" ref = {UsernameRef} type = 'text'/>

                <button className = "username_button"
                        onClick={(e) => {
                            if (UsernameRef.current.value !== "") {
                                setModalActive(false);
                                connectionHandler();
                                document.getElementById("hor").style.position = "inherit";
                            } else
                                console.log('empty')
                        }
                        }
                >
                    Enter
                </button>
            </div>
        </Modal>
    );
};

export default UsernameModal;