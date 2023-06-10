import React from 'react';
import Choice from './input/Choice.js';

const MultipleChoices = ({ setSelect, options }) => {
    return (
        <div>
            <div className="grid space-y-4">
                {Object.keys(options).map((key) => (
                    <React.Fragment key={key}>
                        <Choice setSelect={setSelect} text={options[key]} type={null}/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoices;
