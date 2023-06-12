import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import startFetch from '../../../API';
import AddTestQuestion from './addQuestion';
import EditQuestionsTable from './editQuestionsTable';


// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function ViewTest({ closeViewTestModal, setTests, item }) {
  const [editingTestName, setEditingTestName] = useState(false);
  const [TestName, setTestName] = useState(item.name);
  const [isAddTestQuestionViewing, setIsAddTestQuestionViewing] = useState(false);

  const handleTestNameSaveClick = () => {
    let body = {"name": TestName}
    startFetch(`tests/${item.id}/`, 'PATCH', JSON.stringify(body), function(data) {
      startFetch(`tests/`, 'GET', null, function(data) {
        setTests(data);
      });
    });
    setEditingTestName(false);
    // Perform any additional save logic here if needed
  };

    const toggleModelOpen = () => {
        closeViewTestModal(); // Call the closeEditTestModal function to close the modal
    };

    const handleTestDetails = (e) => {
      // Be careful with when you submit Test, because
      // there is a back button!!
      toggleModelOpen();
    };
    
    const questionHeaders = ["Pregunta", "Tipo"];
    return (
      <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
      <div onClick={toggleModelOpen}
        className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
        aria-hidden="true"
      />
        <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
          <div className="flex items-center justify-between space-x-4">
            <h1 className="text-xl font-bold text-gray-800">
              Editar Prueba
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
            Aqui puedes ver los detalles de tu prueba, y modificar lo necesario (incluyendo las preguntas).
          </p>

          <div className="mt-5">
            <div>
              <label
                htmlFor="Test name"
                className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
              >
                Nombre de la prueba
              </label>
              {editingTestName ? (
                <div>
                  <input
                    type="text"
                    value={TestName}
                    onChange={name => setTestName(name.target.value)}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                  <button onClick={handleTestNameSaveClick} className="flex items-center ml-2 mb-5 mt-1">
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
                    value={TestName}
                    readOnly={true}
                    className="block w-6/12 px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                  <button className="h-8 ml-2" onClick={() => setEditingTestName(true)}>
                    <svg className="h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Editar
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col h-96 min-w-full py-6 align-middle">  
              <div className="flex-grow rounded-2xl overflow-auto"> 
                <EditQuestionsTable item={item}/>
                {/* Add Question button */}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setIsAddTestQuestionViewing(true)}
                className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 bg:hover-gray-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                  <div className='flex items-center justify-center'>
                    <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Añadir Pregunta
                  </div>
                </button>
                <button onClick={handleTestDetails}
                className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                  Guardar
                  <svg className="w-6 h-6 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                </button>
            </div>
          </div>
          {(isAddTestQuestionViewing && (
              <AddTestQuestion toggleModelOpen={() => setIsAddTestQuestionViewing(!isAddTestQuestionViewing)} setTests={setTests} item={item}/>
            ))}
        </div>
      </div>


    </div>
    );
};

export default ViewTest;
