import React from 'react';
import Choice from './input/Choice.js';


const MultipleChoices = () => {

    let options = ["Opcion A","Opcion B","Opcion C","Opcion D","Opcion E"]
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
    
export default MultipleChoices;