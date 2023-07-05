import React, { useState, useEffect } from 'react';

const Number = ({ setSelect }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue('');
    }, []);

    function onWritte(event) {
        let value = event.target.value;
        setInputValue(value);
        setSelect(value);
    }

    return (
        <div>
            <div className="grid space-y-4">
                <input
                    id="numberInput"
                    type="text"
                    className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md border-2 py-2 px-4 text-sm"
                    placeholder="Escriba su respuesta.."
                    value={inputValue}
                    onChange={onWritte}
                />
            </div>
        </div>
    );
};

export default Number;
