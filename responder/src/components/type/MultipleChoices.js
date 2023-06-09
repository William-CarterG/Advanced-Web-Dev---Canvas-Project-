import React from 'react';
import Choice from './input/Choice.js';

const MultipleChoices = ({ options }) => {
    return (
        <div>
            <div className="grid space-y-4">
                {Object.keys(options).map((key) => (
                    <React.Fragment key={key}>
                        <Choice text={options[key]} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MultipleChoices;
