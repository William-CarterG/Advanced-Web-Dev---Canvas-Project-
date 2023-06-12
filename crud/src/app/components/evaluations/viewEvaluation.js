import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import startFetch from '../../../API';


// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function ViewEvaluation({ closeViewEvaluationModal, setEvaluations, item}) {
  const [editingEvaluationName, setEditingEvaluationName] = useState(false);
  const [evaluationName, setEvaluationName] = useState(item.name);

  const handleEvaluationNameSaveClick = () => {
    let body = {"name": evaluationName}
    startFetch(`evaluations/${item.id}/`, 'PATCH', JSON.stringify(body), function(data) {
      startFetch(`evaluations/`, 'GET', null, function(data) {
        setEvaluations(data);
      });
    });
    setEditingEvaluationName(false);
    // Perform any additional save logic here if needed
  };
  
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();
  
    const formattedDate = new Date(year, month - 1, day); // Month is zero-based, so we subtract 1
    console.log(formattedDate, dateString);
    return formattedDate;
  }

  const minDate = new Date(item.limit_date);   // Shouldn't change. Should keep min posible date until database is updated.
  const [selectedDate, setSelectedDate] = useState(formatDate(item.limit_date)); // Initialize with tomorrow's date
  const [editingSelectedDate, setEditingSelectedDate] = useState(false);
  const handleSelectedDateSaveClick = () => {
    let body = {"limit_date": selectedDate}
    startFetch(`evaluations/${item.id}/`, 'PATCH', JSON.stringify(body), function(data) {
      startFetch(`evaluations/`, 'GET', null, function(data) {
        setEvaluations(data);
      });
    });
    setEditingSelectedDate(false);
    // Perform any additional save logic here if needed
  };

  const [editingEvaluationInstructions, setEditingEvaluationInstructions] = useState(false);
  const [evaluationInstructions, setEvaluationInstructions] = useState("Esta prueba trata sobre el contenido de CSS y HTML que hemos visto en clase. La prueba tendrá 5 preguntas en formato de Verdadero o Falso. ¡Buena suerte!");

  const handleEvaluationInstructionsSaveClick = () => {
    let body = {"general_instructions": evaluationInstructions}
    startFetch(`evaluations/${item.id}/`, 'PATCH', JSON.stringify(body), function(data) {
      startFetch(`evaluations/`, 'GET', null, function(data) {
        setEvaluations(data);
      });
    });
    setEditingEvaluationInstructions(false);
    // Perform any additional save logic here if needed
  };


    // Assuming you have a state variable named 'currentPage' to track the current page
    const [currentPage, setCurrentPage] = useState(1);

    // Function to go to the next page
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // Function to go to the previous page
    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const toggleModelOpen = () => {
        closeViewEvaluationModal(); // Call the closeEditEvaluationModal function to close the modal
    };


    return (
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
      />
        {currentPage === 1 && (
            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-bold text-gray-800">
                  Editar Evaluacion
                </h1>

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

              <p className="mt-2 text-sm text-gray-500">
                Aqui puedes ver los detalles de la evaluacion, y modificar lo necesario.
              </p>

              <div className="mt-5">
                <div>
                  <label
                    htmlFor="Evaluation name"
                    className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                  >
                    Nombre de la evaluacion
                  </label>
                  {editingEvaluationName ? (
                    <div>
                      <input
                        type="text"
                        value={evaluationName}
                        onChange={name => setEvaluationName(name.target.value)}
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                      <button onClick={handleEvaluationNameSaveClick} className="flex items-center ml-2 mb-5 mt-1">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <div className='flex'>
                      <input
                        type="text"
                        value={evaluationName}
                        readOnly={true}
                        className="block w-6/12 px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                      <button className="ml-2" onClick={() => setEditingEvaluationName(true)}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Editar
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="Evaluation Test"
                    className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                  >
                    Test
                  </label>
                  <input
                    placeholder="CSS & HTML"
                    type="text"
                    readOnly={true}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="Evaluation Group"
                    className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                  >
                    Grupo
                  </label>
                  <input
                    placeholder="Desarrollo Web Avanzado"
                    type="text"
                    readOnly={true}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={goToNextPage}
                  className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                    Siguiente Pagina
                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                  </button>
                </div>
              </div>

            </div>
        )}
        {currentPage === 2 && (
            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-bold text-gray-800">
                  Editar Evaluacion
                </h1>

                <div className=''>
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

              <p className="mt-2 text-sm text-gray-500">
                Aqui puedes ver los detalles de la evaluacion, y modificar lo necesario.
              </p>

              <div className="mt-5">
                <div onClick={e => e.preventDefault()}>
                  <label
                    htmlFor="Submission Deadline"
                    className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                  >
                    Tiempo de entrega
                  </label>
                  {editingSelectedDate ? (
                    <div>
                      <DatePicker
                        minDate={minDate}
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="block w-4/12 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                      <button onClick={handleSelectedDateSaveClick} className="flex items-center ml-2 mb-5 mt-1">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <DatePicker
                          minDate={minDate}
                          selected={selectedDate}
                          onChange={date => setSelectedDate(date)}
                          dateFormat="dd-MM-yyyy"
                          disabled
                          className="block w-4/12 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                        />
                      </div>
                      <button className="ml-2" onClick={() => setEditingSelectedDate(true)}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Editar
                      </button>
                    </div>
                  )}
                </div>

                <label
                  htmlFor="Evaluation Instructions"
                  className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                >
                  Instrucciones Generales
                </label>
                {editingEvaluationInstructions? (
                    <div>
                      <textarea
                      value={evaluationInstructions}
                      onChange={instructions => setEvaluationInstructions(instructions.target.value)}
                      className="block w-full h-44 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />

                      <button onClick={handleEvaluationInstructionsSaveClick} className="flex items-center ml-2 mb-5 mt-1">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                        </svg>
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <textarea
                      value={evaluationInstructions}
                      readOnly={true}
                      className="block w-full h-44 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                      <button className="ml-2" onClick={() => setEditingEvaluationInstructions(true)}>
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Editar
                      </button>
                    </div>
                  )}
              </div>

              <div className="flex justify-start mt-6">
                <button onClick={goToPreviousPage}
                className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                  Pagina Anterior
                </button>
            </div>

            </div>
        )}
      </div>


    </div>
    );
};

export default ViewEvaluation;
