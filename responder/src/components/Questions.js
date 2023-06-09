import React from 'react';
import Bools from './type/Bools.js';
import MultipleChoices from './type/MultipleChoices.js';
import SemiOpen from './type/SemiOpen.js';
import Number from './type/Number.js';
import Matrix from './type/Matrix.js';


const Questions = ({question, index, setIndex, countOfQuestions, description, setRoute}) => {
    
    const renderQuestion = () => {
        switch (question["question_type"]) {
            case 'bools':
                return <Bools />;
            case 'multipleChoices':
                return <MultipleChoices options={question["options"].split(";")}/>;
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
                        if (index+1 == countOfQuestions){
                            setRoute('finished')
                        } else{
                            setIndex(index+1)
                            setRoute('questions')
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