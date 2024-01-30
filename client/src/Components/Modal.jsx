import React from 'react';
import '../Style/Modal.css'

const Modal = ({active, setActive, children, canClose}) => {
    return (
        <div
            className = {active ? "modal modal-active" : "modal"}
            onClick={e => canClose ? setActive(false) : setActive(true)}
        >
            <div
                className = {active ? "modal_content modal_content-active" : "modal_content"}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;