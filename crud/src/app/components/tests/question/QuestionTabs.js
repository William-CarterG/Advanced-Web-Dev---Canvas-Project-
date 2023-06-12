import React, { useState } from 'react';
import Choice from '../type/input/Choice';

const QuestionTabs = ( {toggleMenu} ) => {
  const [selectedTab, setSelectedTab] = useState('verdaderoFalso');
  const [editingQuestionName, setEditingQuestionName] = useState(false);
  const [QuestionName, setQuestionName] = useState("¿Es la tierra redonda?");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleQuestionNameSaveClick = () => {
    console.log("Question name added.");
    setEditingQuestionName(false);
  };

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li className="flex-1">
            <a
              href="#"
              className={`relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 
              hover:bg-white hover:text-gray-700 hover:shadow 
              ${selectedTab === 'verdaderoFalso' ? 'bg-white shadow hover:bg-white hover:text-gray-700' : 'bg-transparent shadow-none'
              }`}
              onClick={() => handleTabClick('verdaderoFalso')}
            >
              Verdadero o Falso
            </a>
          </li>
          <li className="flex-1">
            <a
              href="#"
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500  
              hover:bg-white hover:text-gray-700 hover:shadow
              ${selectedTab === 'alternativaMultiple' ? 'bg-white shadow' : 'bg-transparent shadow-none'
              }`}
              onClick={() => handleTabClick('alternativaMultiple')}
            >
              Alternativa Múltiple
            </a>
          </li>
        </ul>
      </div>

      {selectedTab === 'verdaderoFalso' && (
        <div>
          {/* Content for Verdadero o Falso tab */}
          {/* Add your content here */}
          <div className="p-4 bg-white rounded-lg shadow">

          <div className="flex flex-col gap-3">
            <div>
            <label
                htmlFor="Test name"
                className="font-bold block text-l text-gray-700 capitalize dark:text-gray-200"
              >
                Escribe tu pregunta
              </label>
              {editingQuestionName ? (
                <div>
                  <input
                    type="text"
                    value={QuestionName}
                    onChange={name => setQuestionName(name.target.value)}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                  <button onClick={handleQuestionNameSaveClick} className="flex items-center ml-2 mb-5 mt-1">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    Guardar
                  </button>
                </div>
              ) : (
                <div className='flex h-12'>
                  <input
                    type="text"
                    value={QuestionName}
                    readOnly={true}
                    className="block w-6/12 px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                  <button className="h-8 ml-2" onClick={() => setEditingQuestionName(true)}>
                    <svg className="h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Editar
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-2 mb-2">Selecciona la respuesta verdadera</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input type="radio" id="true" name="answer" className="mr-2" />
                  <label htmlFor="answer" className="text-gray-700">
                    Verdadero
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="false" name="answer" className="mr-2" />
                  <label htmlFor="false" className="text-gray-700">
                    Falso
                  </label>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {selectedTab === 'alternativaMultiple' && (
        <div>
          {/* Content for Alternativa Múltiple tab */}
          {/* Add your content here */}
        </div>
      )}
    </div>
  );
};

export default QuestionTabs;
