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
    if(modelOpen){
      setCurrentPage(1);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Function to go to the next page
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleTestSubmit = (e) => {
    // Be careful with when you submit Test, because
    // there is a back button!!
    setCurrentPage(1);
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

            {currentPage === 1 && (
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
                    Nombre de Grupo
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
                  <button onClick={goToNextPage}
                  className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                    Siguiente Pagina
                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                  </button>
                </div>
                </form>
              </div>
            )}
            {currentPage === 2  && (
              <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                <div className="flex items-center justify-between space-x-4">
                  <h1 className="text-xl font-bold text-gray-800 ">Añadir preguntas a la prueba</h1>

                  <div className=''>
                    <button
                      onClick={goToPreviousPage}
                      className="mr-3 text-gray-600 focus:outline-none hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 16l-6-6 6-6"/>
                        <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                      </svg>
                    </button>

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
                </div>

                <p className="mt-2 text-sm text-gray-500 ">
                  Crea las preguntas para tu prueba. Cuando estés listo, aprieta el botón de 'Crear' para terminar de crear tu prueba.
                </p>

                <div className="flex flex-col h-96 min-w-full py-6 align-middle">  
                  <div className="flex-grow rounded-2xl overflow-auto"> 
                    <table className="relative w-full border"> 
                        <thead className="sticky top-0 px-6 py-3 bg-gray-50">
                            <tr>
                            {questionHeaders.map((header, index) => (
                            <th key={index}
                                scope="col"
                                className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                                {header}
                            </th>
                            ))}
                            <th scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                                <span className="sr-only">Actions</span>
                            </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr className="border-b hover:bg-gray-50">
                            <td className="p-4 text-center">What is kind of element would you use to create a table in HTML.</td>
                            <td className="p-4 text-center">Multiple Choice</td>      
                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {/* Delete button */}
                              <div className="inline-block text-left">
                                  <button
                                  type="button"
                                  className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                  aria-haspopup="true"
                                  >
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                  </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                    <button onClick={() => setIsAddTestQuestionViewing(true)} 
                    className="mt-3 pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 bg:hover-gray-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                      <div className='flex items-center justify-center'>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Agregar Pregunta
                      </div>
                    </button>
                  </div>
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
              </div>
            )}
            {(isAddTestQuestionViewing && (
              <AddTestQuestion toggleModelOpen={() => setIsAddTestQuestionViewing(!isAddTestQuestionViewing)} setTests={setTests} id={item.id}/>
            ))}
          </div>

        </div>
      )};
    </div>
  );
};

export default AddTest;
