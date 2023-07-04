import React, { useEffect, useState } from 'react';

const RenderMatrixQuestions = ( { data, setAnswer, setQuestion } ) => {
    const [matrixQuestions, setMatrixQuestions] = useState([]);
    const [matrixAnswers, setMatrixAnswers] = useState([]);

    useEffect(() => {
        setMatrixQuestions(data.options);
        //setMatrixAnswers(data.)
    })

    const handleMatrixQuestionChange = (e, index) => {
        const updatedMatrixQuestions = [...matrixQuestions];
        updatedMatrixQuestions[index] = e.target.value;
        setMatrixQuestions(updatedMatrixQuestions);
        setQuestion(updatedMatrixQuestions.join(";"))
      };
    
    const handleMatrixQuestionAnswers = (e, index) => {
        const nuevaRespuestaInputs = document.querySelectorAll('.nueva-respuesta-input');
        let concatenatedValues = '';
        nuevaRespuestaInputs.forEach((input, index) => {
            if (index !== 0) {
            concatenatedValues += ';';
            }
            concatenatedValues += input.value;
        });
        setAnswer(concatenatedValues);
    }

    const handleDeleteMatrixQuestion = (index) => {
        let updatedMatrixQuestions = [...matrixQuestions];
        updatedMatrixQuestions.splice(index, 1);
        setMatrixQuestions(updatedMatrixQuestions);
        setQuestion(updatedMatrixQuestions.join(";"))

        const nuevaRespuestaInputs = document.querySelectorAll('.nueva-respuesta-input');
        let concatenatedValues = '';
        nuevaRespuestaInputs.forEach((input, index) => {
            if (index !== 0) {
            concatenatedValues += ',';
            }
            concatenatedValues += input.value;
        });
        console.log(concatenatedValues);
        setAnswer(concatenatedValues);
    };

    return (
      <div className='mr-6'>
        {matrixQuestions.map((matrixQuestion, index) => (
          <div key={index} className="flex items-center" id={`a${index}`}>
            <input
              type="text"
              placeholder={matrixQuestion}
              onChange={(e) => handleMatrixQuestionChange(e, index)}
              className="block w-full px-3 py-2 mt-1 mr-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
            {/* Delete alternative */}
            <input
              type="text"
              placeholder={"Nueva respuesta"}
              onChange={(e) => handleMatrixQuestionAnswers(e, index)}
              className="nueva-respuesta-input block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
            <button
              onClick={() => handleDeleteMatrixQuestion(index)}
              className="flex items-center ml-1 mt-1"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        {matrixQuestions.length < 6 && (
        <button
          onClick={handleAddMatrixQuestion}
          className="flex items-center ml-2 mb-5 mt-1"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Agregar Pregunta
        </button>
        )}   
      </div>
    );
  };


export default RenderMatrixQuestions