import React from 'react';
import '../Resources/Styles/NumberInput.css'

const NumberInput = ({value, setValue, minValue, maxValue}) => {
    return (
        <div className="numberInputContainer">
            <span>{parseInt(value)} px</span>
            <div className="numberInputButtons">
                <span onClick={() => setValue(parseInt(value) + 1 <= maxValue ? parseInt(value) + 1 : value)} className="numberInputButton">+</span>
                <span onClick={() => setValue(parseInt(value) - 1 >= minValue ? parseInt(value) - 1 : value)} className="numberInputButton">-</span>
            </div>
        </div>
    );
};

export default NumberInput;