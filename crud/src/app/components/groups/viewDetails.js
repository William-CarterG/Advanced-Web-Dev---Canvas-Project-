import React, { useState,  useEffect } from 'react';
import StudentTableComponent from './students/StudentTable';
import ColorSelectionComponent from '../util/ColorSelection';
import UploadFilesComponent from '../util/UploadFiles';
import startFetch from '../../../API';

// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function ViewGroup({ closeViewGroupModal, id, setGroups }) {
    const [editMode, setEditMode] = useState(false);
    const togglEditMode = () => {
        setEditMode(!editMode);
    }

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

    const [students, setStudents] = useState([]);

    useEffect(() => {
        startFetch(`courses/${id}/members/`, 'GET', null, function(data) {
            setStudents(data);
        });
    }, [id]); //aqui agregue id para evitar un error
    const fakeUserData = students;
    const toggleModelOpen = () => {
        closeViewGroupModal(); // Call the closeEditGroupModal function to close the modal
    };

    return (
        <div
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        >
        {currentPage === 1 && (
            <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
                <div onClick={toggleModelOpen}
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
                aria-hidden="true"
                />
                <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                    <div className="flex items-center justify-between space-x-4">
                        <h1 className="text-xl font-bold text-gray-800">
                        Detalles de Grupos
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
                        Ver todos los detalles de los miembros del grupo.
                    </p>
                    <StudentTableComponent
                        data={fakeUserData} 
                        headers={['Nombre', 'Apellido', 'Email']} 
                        setGroups={setGroups}
                        groupId = {id}
                        setStudents = {setStudents}
                    />
                    <div className="flex justify-end mt-6">
                        <button onClick={goToNextPage}
                        className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                        Estilo Visual del Grupo
                        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        )};
        {currentPage === 2 && (
            <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
                <div onClick={toggleModelOpen}
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
                aria-hidden="true"
                />
                <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                    <div className="flex items-center justify-between space-x-4">
                        <h1 className="text-xl font-bold text-gray-800">
                        Estilo Visual del Grupo
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
                   
                    <form className="mt-5">
                        <div className='mt-3 flex gap-4'>
                            <ColorSelectionComponent name={"Background"}/>
                            <ColorSelectionComponent name={"Text Font"}/>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="Group logo.'"
                                className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                            >
                                Logo del grupo
                            </label>
                            <div>
                                {editMode ? (
                                    <div className=''>
                                        <UploadFilesComponent />
                                        <button
                                    onClick={togglEditMode}
                                    className="mt-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                    href="*"
                                    >
                                    Guardar
                                    </button>
                                    </div>
                                ) : (
                                <>
                                <svg className="w-44 h-44" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                                </svg>
                                
                                    <button
                                    onClick={togglEditMode}
                                    className="mt-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                    href="*"
                                    >
                                    Editar
                                    </button>
                                </>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-start mt-6">
                        <button onClick={goToPreviousPage}
                        className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                        <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                         Detalles del miembro
                        </button>
                    </div>
                </div>
            </div>
        )};
        </div>
    );
};

export default ViewGroup;
