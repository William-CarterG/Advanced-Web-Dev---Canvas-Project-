import React, { useState } from 'react';
import Tags from '../../tags/Tags';

const QuestionTabs = ({ setChoices, setName, setDifficulty, setCorrect, setType }) => {
  const [selectedTab, setSelectedTab] = useState('verdaderoFalso');
  const [editingQuestionName, setEditingQuestionName] = useState(false);
  const [questionName, setQuestionName] = useState('¿Es la tierra redonda?');
  const [alternatives, setAlternatives] = useState([]);
  const [correctChoice, setCorrectChoice] = useState(0);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setType(tab === 'alternativaMultiple' ? 1 : 0);
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

  const handleOptionSelection = (index) => {
    setCorrect(index);
    setCorrectChoice(index);
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
    if (selectedTab === 'alternativaMultiple') {
      return (
        <div>
          {alternatives.map((alternative, index) => (
            <div key={index} className="flex items-center" id={`a${index}`}>
              <input
                type="radio"
                onChange={() => handleOptionSelection(index)}
                className="w-4 h-4 mr-2"
                checked={index === correctChoice}
              />
              <input
                type="text"
                placeholder={alternative}
                onChange={(e) => handleAlternativeChange(e, index)}
                className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
              />
              {/* Delete alternative */}
              <button
                onClick={() => handleDeleteAlternative(index)}
                className="flex items-center ml-2 mb-5 mt-1"
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
                Eliminar
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
        <div className='flex flex-row'>
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
    }
    
    return null;
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => handleTabClick('verdaderoFalso')}
            className={`py-2 px-4 rounded-lg mr-4 focus:outline-none ${
              selectedTab === 'verdaderoFalso'
                ? 'bg-[#1d232e] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Verdadero/Falso
          </button>
          <button
            onClick={() => handleTabClick('alternativaMultiple')}
            className={`py-2 px-4 rounded-lg focus:outline-none ${
              selectedTab === 'alternativaMultiple'
                ? 'bg-[#1d232e] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            Alternativa Múltiple
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="questionName" className="block text-gray-600">
          Pregunta:
        </label>
        {renderQuestionName()}
      </div>
      <div className='flex flex-row'>
        <div>
          <label htmlFor="alternatives" className="mb-2 block text-gray-600">
            Alternativas:
          </label>
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
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
      </div>
      <Tags />
    </div>
  );
};

export default QuestionTabs;