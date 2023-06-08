import React, { useState } from 'react';
import Bools from './type/Bools.js';
import MultipleChoices from './type/MultipleChoices.js';
import SemiOpen from './type/SemiOpen.js';
import Number from './type/Number.js';
import Matrix from './type/Matrix.js';


const Questions = () => {
    const [question, setQuestion] = useState('bools');
    const renderQuestion = () => {
        switch (question) {
            case 'bools':
                return <Bools />;
            case 'multipleChoices':
                return <MultipleChoices />;
            case 'semiOpen':
                return <SemiOpen />;
            case 'number':
                return <Number />;
            case 'matrix':
                return <Matrix />;
        }
      };
    return (
        <div class="flex items-center justify-center pt-5 px-5">
            <div class="mx-auto w-full">
                <div class="mb-5">
                    <label
                    class="flex text-justify mb-3 text-lg font-medium text-gray-700"
                    >
                    ¿Aqui se puede ver una pregunta que cambia dinamicamente?
                    </label>
                    <div>{renderQuestion()}</div>
                </div>
                <div className="flex justify-center w-full">
                    <button
                    className="w-2/3 rounded-lg bg-gray-700 py-3 px-8 text-base font-semibold text-white outline-none"
                    onClick={() => {
                        if (question === "bools") {
                            setQuestion('multipleChoices');
                        } else{
                            if (question === "multipleChoices") {
                                setQuestion('semiOpen');
                            } else{
                                if (question === "semiOpen") {
                                    setQuestion('number');
                                } else{
                                    if (question === "number") {
                                        setQuestion('matrix');
                                    } else{
                                        if (question === "matrix") {
                                            setQuestion('bools');
                                        }
                                    }
                                }
                            }
                        }
                    }}
                    >
                    Enviar
                    </button>
                </div>
            </div>
        </div>
    ); 
};

export default Questions;