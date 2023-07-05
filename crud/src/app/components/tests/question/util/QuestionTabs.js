import React, { useState } from 'react';
import Tags from '../../tags/Tags';

const QuestionTabs = ({ setChoices, setName, setDifficulty, setCorrect, setType, setTags, prevTags }) => {
  const [selectedTab, setSelectedTab] = useState('verdaderoFalso');
  const [editingQuestionName, setEditingQuestionName] = useState(false);
  const [questionName, setQuestionName] = useState('¿Es la tierra redonda?');
  const [alternatives, setAlternatives] = useState([]);
  const [matrixQuestions, setMatrixQuestions] = useState([]);
  const [correctChoice, setCorrectChoice] = useState(0);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setType(
      tab === 'verdaderoFalso' ? 0 :
      tab === 'alternativaMultiple' ? 1 :
      tab === 'semi' ? 2 :
      tab === 'numerical' ? 3 :
      tab === 'matrix' ? 4 : null
    );    
  };

  const handleQuestionNameSaveClick = () => {
    setName(questionName);
    setEditingQuestionName(false);
  };

  const handleAlternativeChange = (e, index) => {
    const updatedAlternatives = [...alternatives];
    updatedAlternatives[index] = e.target.value;
    setChoices(updatedAlternatives);
    setAlternatives(updatedAlternatives);
  };

  const handleDeleteAlternative = (index) => {
    let updatedAlternatives = [...alternatives];
    updatedAlternatives.splice(index, 1);
    setChoices(updatedAlternatives);
    setAlternatives(updatedAlternatives);
  };

  const handleAddAlternative = () => {
    const newAlternative = `Nueva Alternativa`;
    setAlternatives([...alternatives, newAlternative]);
  };

  const handleMatrixQuestionChange = (e, index) => {
    const updatedMatrixQuestions = [...matrixQuestions];
    updatedMatrixQuestions[index] = e.target.value;
    setMatrixQuestions(updatedMatrixQuestions);
    setName(updatedMatrixQuestions.join(";"))
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
    setCorrect(concatenatedValues);
  }

  const handleDeleteMatrixQuestion = (index) => {
    let updatedMatrixQuestions = [...matrixQuestions];
    updatedMatrixQuestions.splice(index, 1);
    setMatrixQuestions(updatedMatrixQuestions);
    setName(updatedMatrixQuestions.join(";"))

    const nuevaRespuestaInputs = document.querySelectorAll('.nueva-respuesta-input');
    let concatenatedValues = '';
    nuevaRespuestaInputs.forEach((input, index) => {
      if (index !== 0) {
        concatenatedValues += ',';
      }
      concatenatedValues += input.value;
    });
    console.log(concatenatedValues);
    setCorrect(concatenatedValues);
  };

  const handleAddMatrixQuestion = () => {
    const newMatrixQuestion = `Nueva Pregunta`;
    setMatrixQuestions([...matrixQuestions, newMatrixQuestion]);
  };

  const handleOptionSelection = (index) => {
    setCorrect(alternatives[index]); setCorrectChoice(index);
    if (selectedTab === 'verdaderoFalso'){
      setCorrect(index);
      setChoices([0,1]);
    }
    else{
      setChoices(alternatives); 
    }
  };
  
  const renderQuestionName = () => {
    if (editingQuestionName) {
      return (
        <div>
          <input
            type="text"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
            className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
          <button onClick={handleQuestionNameSaveClick} className="flex items-center ml-2 mb-5 mt-1">
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
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
              />
            </svg>
            Guardar
          </button>
        </div>
      );
    }

    return (
      <div className="flex h-12">
        <input
          type="text"
          value={questionName}
          readOnly={true}
          className="block w-6/12 px-3 py-2 mt-1 text-gray-600 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
        />
        <button
          onClick={() => setEditingQuestionName(true)}
          className="flex items-center ml-2 mb-5 mt-1"
        >
          <svg
            className="h-6"
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Editar
        </button>
      </div>
    );
  };
  
  const renderAlternatives = () => {
    if (selectedTab === 'alternativaMultiple' || selectedTab === 'semi' || selectedTab === 'matrix') {
      return (
        <div>
          {alternatives.map((alternative, index) => (
            <div key={index} className="flex items-center" id={`a${index}`}>
              {selectedTab !== 'matrix' && <input
                type="radio"
                onChange={() => handleOptionSelection(index)}
                className="w-4 h-4 mr-2"
                checked={index === correctChoice}
              />}
              <input
                type="text"
                placeholder={alternative}
                onChange={(e) => handleAlternativeChange(e, index)}
                className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
              />
              {/* Delete alternative */}
              <button
                onClick={() => handleDeleteAlternative(index)}
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
          {alternatives.length < 6 && (
          <button
            onClick={handleAddAlternative}
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
            Agregar Alternativa
          </button>
          )}   
        </div>
      );
    } else if (selectedTab === 'verdaderoFalso') {
      return (
        <div className='flex flex-row mt-3'>
          <div className="flex items-center mr-3" id="a0">
            <input
              type="radio"
              onChange={() => handleOptionSelection(0)}
              value={'Verdadero'}
              className="w-4 h-4 mr-2"
              checked={0 === correctChoice}
            />
            <span className="text-gray-600">Verdadero</span>
          </div>
          <div className="flex items-center" id="a1">
            <input
              type="radio"
              onChange={() => handleOptionSelection(1)}
              value={'Falso'}
              className="w-4 h-4 mr-2"
              checked={1 === correctChoice}
            />
            <span className="text-gray-600">Falso</span>
          </div>
        </div>
      );
    } else if (selectedTab === 'numerical') {
      return (
        // Numerical shouldn't have options/alternatives like the others...
        // It should just have an input box that receives only numerical values (including floats)
        // and is always the correct value (in other words, there is only one alternative and it's always the correct one
        // so there is no need to select it ; just to make sure the correct is being set properly)
        <div>
          <input
            type="number"
            placeholder="Enter numerical value"
            onChange={(event) => setCorrect(event.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div>
      );
    } 
    return null;
  };

  const renderMatrixQuestions = () => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li className="flex-1">
            <button
              onClick={() => handleTabClick('verdaderoFalso')}
              className={`relative whitespace-nowrap flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:bg-[#1d232e] hover:text-white focus:outline-none ${
                selectedTab === 'verdaderoFalso'
                  ? 'bg-[#1d232e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Verdadero/Falso
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => handleTabClick('alternativaMultiple')}
              className={`relative whitespace-nowrap flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:bg-[#1d232e] hover:text-white focus:outline-none ${
                selectedTab === 'alternativaMultiple'
                  ? 'bg-[#1d232e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Alternativa Múltiple
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => handleTabClick('semi')}
              className={`relative whitespace-nowrap flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:bg-[#1d232e] hover:text-white focus:outline-none ${
                selectedTab === 'semi'
                  ? 'bg-[#1d232e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Semi-abierta
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => handleTabClick('numerical')}
              className={`relative whitespace-nowrap flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:bg-[#1d232e] hover:text-white focus:outline-none ${
                selectedTab === 'numerical'
                  ? 'bg-[#1d232e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Numérica
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => handleTabClick('matrix')}
              className={`relative whitespace-nowrap flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:bg-[#1d232e] hover:text-white focus:outline-none ${
                selectedTab === 'matrix'
                  ? 'bg-[#1d232e] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              Matriz
            </button>
          </li>
        </ul>
      </div>
      {selectedTab !== 'matrix' && (
        <div className="mb-6">
          <label htmlFor="questionName" className="block text-gray-600">
            Pregunta:
          </label>
          {renderQuestionName()}
        </div>
      )}

      <div className='flex flex-row'>
        {selectedTab === 'matrix' && (
        <div>
          <label htmlFor="questionName" className="block text-gray-600">
            Pregunta:
          </label>
          {renderMatrixQuestions()}
        </div>
        
        )}
        <div>
          {selectedTab !== 'numerical' ? (
            <label htmlFor="alternatives" className=" block text-gray-600">
              Alternativas:
            </label>
          ):(
            <label htmlFor="alternatives" className="mb-2 block text-gray-600">
              Respuesta:
            </label>
          )}
          {renderAlternatives()}
        </div>
        <div className="ml-10">
          <label htmlFor="difficulty" className="mr-2 mb-2 block text-gray-600">
            Dificultad:
          </label>
          <select
            id="difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          >
            <option value={0}>Fácil</option>
            <option value={1}>Medio</option>
            <option value={2}>Difícil</option>
          </select>
        </div>
      </div>
      <Tags sendTags={setTags} prevTags={''}/>
    </div>
  );
};

export default QuestionTabs;