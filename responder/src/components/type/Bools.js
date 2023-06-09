import React from 'react';
import Choice from './input/Choice.js';

const Bools = () => {

    let options = ["Verdadero","Falso"]
    return (
        <div>
            <div class="grid space-y-4">
                {Object.keys(options).map((key) => (
                    <React.Fragment key={key}>
                        <Choice text={options[key]}  />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
  };
    
export default Bools;