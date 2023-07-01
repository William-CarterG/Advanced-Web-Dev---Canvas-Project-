// import { useState, useEffect } from 'react';
// import startFetch from '../../../../../API';

const EditTestQuestion = ({ toggleModelOpen, question }) => {
    const handleSaveEdit = () => {
       // Edit
        
    };

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
                    <div className="flex items-center justify-between space-x-2">
                        <h1 className="text-xl font-bold text-gray-800">
                        Editar Pregunta
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
                    <p className="mb-2 text-sm text-gray-500 ">
                        Acá puedes editar el contenido de la pregunta
                    </p>
                    <div className="flex justify-end mt-6">
                        <button href="*"
                        className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-m tracking-wide text-white 
                        capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none 
                        focus:ring focus:ring-opacity-50"
                        onClick={handleSaveEdit}>
                            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                            </svg>
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTestQuestion;
