import React from 'react';
import '../Resources/Styles/NumberInput.css'

const NumberInput = ({value, setValue, minValue, maxValue}) => {
    return (
        <div className="numberInputContainer">
            <span>{parseInt(value)} px</span>
            <div className="numberInputButtons">
                <span onClick={() => setValue(value + 1 <= maxValue ? value + 1 : value)} className="numberInputButton">+</span>
                <span onClick={() => setValue(value - 1 >= minValue ? value - 1 : value)} className="numberInputButton">-</span>
            </div>
        </div>
    );
};

export default NumberInput;