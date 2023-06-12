import React, { useState } from 'react';
import startFetch from '../../../API';
import AddTestQuestion from './addQuestion';


// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function AddTest({setTests, item}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [testName, setTestName] = useState('');
  const [isAddTestQuestionViewing, setIsAddTestQuestionViewing] = useState(false);

  const toggleModelOpen = () => {
    setModelOpen(!modelOpen);
  };

  const handleTestSubmit = (e) => {
    // Be careful with when you submit Test, because
    // there is a back button!!
    toggleModelOpen();
    e.preventDefault();
    let body = { "name": testName}
    startFetch(`tests/`, 'POST', JSON.stringify(body), function(data) {
      startFetch(`tests/`, 'GET', null, function(data) {
        setTests(data);
      });
    });
    console.log("Add test");
  };

  const questionHeaders = ["Pregunta", "Tipo"];
  return (
    <div className='mt-4'>
      <button
        onClick={toggleModelOpen}
        className="button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white 
        capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none 
        focus:ring focus:ring-opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Crear Test
      </button>

      {modelOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              onClick={toggleModelOpen}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
              aria-hidden="true"
            ></div>

              <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                <div className="flex items-center justify-between space-x-4">
                  <h1 className="text-xl font-bold text-gray-800 ">Añadir nueva prueba</h1>

                  <button
                    onClick={toggleModelOpen}
                    className="text-gray-600 focus:outline-none hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-500 ">
                  Crear una nueva prueba. Escribe su nombre, y en la siguiente página puedes crear las preguntas.
                </p>

                <form className="mt-5">
                <div>
                  <label
                    htmlFor="Group name"
                    className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                  >
                    Nombre de Prueba
                  </label>
                  <input
                    placeholder="Prueba 1 - Client-side developer tools"
                    type="text"
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40 capitalize" 
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button href="*"
                  onClick={handleTestSubmit}
                  className="pressed-button flex items-center justify-center px-6 py-4 space-x-2 tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                    <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                    </svg>
                    Crear
                  </button>
                </div>
                </form>
              </div>
            {(isAddTestQuestionViewing && (
              <AddTestQuestion toggleModelOpen={() => setIsAddTestQuestionViewing(!isAddTestQuestionViewing)} setTests={setTests} item={item}/>
            ))}
          </div>

        </div>
      )};
    </div>
  );
};

export default AddTest;
