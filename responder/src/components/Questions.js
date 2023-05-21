import React, { useState } from 'react';
import Bools from './type/Bools.js';
import Choices from './type/Choices.js';

const Questions = () => {
    const [question, setQuestion] = useState('choices');
    const renderQuestion = () => {
        switch (question) {
          case 'choices':
            return <Choices />;
          case 'bools':
            return <Bools />;
        }
      };
    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <div class="mb-5">
                    <label
                    class="mb-3 block text-2xl font-medium text-gray-700"
                    >
                    ¿Aqui se puede ver una pregunta que cambia dinamicamente?
                    </label>
                    <span>Indique su respuesta:</span>
                    <br/>
                    <div>{renderQuestion()}</div>
                </div>
                <div>
                    <button
                    className="hover:shadow-form rounded-lg bg-gray-700 py-3 px-8 text-base font-semibold text-white outline-none"
                    onClick={() => {
                        if (question === "choices") {
                            setQuestion('bools');
                        } else{
                            setQuestion('choices');
                        }
                    }}
                    >
                    Submit
                    </button>
                </div>
            </div>
        </div>
    ); 
};

export default Questions;