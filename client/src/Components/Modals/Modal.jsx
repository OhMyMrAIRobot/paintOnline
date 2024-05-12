import React from 'react';
import '../../Resources/Styles/Modal.css'

const Modal = ({active, setActive, children, canClose}) => {
    return (
        <div
            className = {active ? "modal modalActive" : "modal"}
            onClick={e => canClose ? setActive(false) : setActive(true)}
        >
            <div
                className = {active ? "modalContent modalContentActive" : "modalContent"}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;