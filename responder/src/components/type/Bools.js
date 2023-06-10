import React from 'react';
import Choice from './input/Choice.js';

const Bools = ({setSelect}) => {

    let options = ["Verdadero","Falso"]

    return (
        <div>
            <div class="grid space-y-4">
                {Object.keys(options).map((key) => (
                    <React.Fragment key={key}>
                        <Choice setSelect={setSelect} text={options[key]} type={"bools"}/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
  };
    
export default Bools;