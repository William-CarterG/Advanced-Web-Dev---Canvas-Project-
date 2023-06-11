import React, { useState } from 'react';
import Bools from './type/Bools.js';
import MultipleChoices from './type/MultipleChoices.js';
import SemiOpen from './type/SemiOpen.js';
import Number from './type/Number.js';
import Matrix from './type/Matrix.js';


const Questions = ({question, index, setIndex, countOfQuestions, description, setRoute, evToken, tokenState}) => {
    const [select, setSelect] = useState(null);
    const renderQuestion = () => {
        switch (question["question_type"]) {
            case 'Verdadero o Falso':
                return <Bools setSelect={setSelect}/>;
            case 'Alternativas':
                return <MultipleChoices setSelect={setSelect} options={question["options"][0]["options"].split(";")}/>;
            case 'semiOpen':
                return <SemiOpen />;
            case 'number':
                return <Number />;
            case 'matrix':
                return <Matrix />;
            default:
                // do nothing
        }
      };
      
    return (
        <div className="flex items-center justify-center pt-5 px-5">
            <div className="mx-auto w-full">
                <div className="mb-5">
                    <label
                    className="flex text-justify mb-3 text-lg font-medium text-gray-700"
                    >
                    {question["text"]}
                    </label>
                    <div className="flex justify-between mb-4">
                        <span className=" text-xs">{description}</span>
                        <span className="text-xs">Pregunta {index+1} de {countOfQuestions}</span>
                    </div>
                    <div>{renderQuestion()}</div>
                </div>
                <div className="flex justify-center w-full">
                    <button
                    className="w-2/3 rounded-lg bg-gray-700 py-3 px-8 text-base font-semibold text-white outline-none"
                    onClick={() => {
                        if (question["correct_answer"] === select){
                            let correctValue = tokenState[evToken]["correct"];
                            tokenState[evToken]["correct"] = parseInt(correctValue) + 1
                            localStorage.setItem('tokenState', JSON.stringify(tokenState));
                        }

                        if (index+1 === countOfQuestions){
                            tokenState[evToken]["state"] = 1
                            localStorage.setItem('tokenState', JSON.stringify(tokenState));
                            setRoute('finished')
                        } else{
                            setIndex(index+1)
                            setRoute('questions')
                        }
                        tokenState[evToken]["index"] = index + 1
                        localStorage.setItem('tokenState', JSON.stringify(tokenState));
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