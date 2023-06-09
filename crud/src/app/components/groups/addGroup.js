import React, { useState } from 'react';
import UploadFilesComponent from '../util/UploadFiles';
import ColorSelectionComponent from '../util/ColorSelection';

function AddGroup() {
  const [modelOpen, setModelOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
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
    setModelOpen(!modelOpen);
  };

  const handleGroupSubmit = (e) => {
    // Be careful with when you submit group, because
    // there is a back button!!
    setCurrentPage(1);
    toggleModelOpen();
    e.preventDefault();
    console.log('Added Group.');
    // Additional logic for group submission
  };

  const handleVisualStyleSubmit = (e) => {
    e.preventDefault();
    console.log('Added Visual Style.');
    // Additional logic for student submission
  };


  const handleStudentSubmit = (e) => {
    e.preventDefault();
    console.log('Added Student.');
    // Additional logic for student submission
  };

  return (
    <div className="mt-4">
      <button
        onClick={toggleModelOpen}
        className="button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Create Group
      </button>

      {modelOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
        {currentPage === 1 && (
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              onClick={toggleModelOpen}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
              aria-hidden="true"
            ></div>

            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-medium text-gray-800">
                  Add New Group
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
                Create a new group, which you may include for an evaluation.
              </p>

              <form onSubmit={handleGroupSubmit} className="mt-5">
                <div>
                  <label
                    htmlFor="Group name"
                    className="block text-sm text-gray-700 capitalize dark:text-gray-200"
                  >
                    Group's Name
                  </label>
                  <input
                    placeholder="Desarrollo Web Avanzado"
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={goToNextPage}
                  className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                    Next Page
                    <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {currentPage === 2 && (
      <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
        <div
          onClick={toggleModelOpen}
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
          aria-hidden="true"
        />

        <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
          <div className="flex items-center justify-between space-x-4">
            <h1 className="text-xl font-medium text-gray-800">
              Select a visual style for the group.
            </h1>
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
          <p className="mt-2 text-sm text-gray-500">
              Select your settings to determine how you want your group to look.
          </p>
          <form onSubmit={handleVisualStyleSubmit} className="mt-5">
            {/*<UploadFilesComponent />*/}
            <ColorSelectionComponent name={"Background"}/>
            <ColorSelectionComponent name={"Text Font"}/>
            <div className="flex justify-end mt-6">
              <button onClick={goToNextPage}
              className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                Next Page
                <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
)}

        {currentPage === 3 && (
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              onClick={toggleModelOpen}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
              aria-hidden="true"
            />

            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-medium text-gray-800">
                  Add a Student
                </h1>
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
              <p className="mt-2 text-sm text-gray-500">
                  Add a student that belongs to this group.
              </p>
              <form onSubmit={handleStudentSubmit} className="mt-5">
                <div>
                  <label
                    htmlFor="Student name"
                    className="mt-2 block text-sm text-gray-700 dark:text-gray-200"
                  >
                    Student's name
                  </label>
                  <input
                    placeholder="John Doe"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Student email"
                    className="mt-2 block text-sm text-gray-700 dark:text-gray-200"
                  >
                    Student's email
                  </label>
                  <input
                    placeholder="JohnDoe@example.com"
                    type="text"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <button href="*"
                  onClick={handleGroupSubmit}
                  className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
}

export default AddGroup;
