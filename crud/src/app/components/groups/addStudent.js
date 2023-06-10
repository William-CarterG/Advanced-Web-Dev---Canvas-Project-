import React, { useState } from 'react';

// Credits to TailwindComponents user 'khatabwedaa' for 
// creating a good part of this modal window. 
function AddStudent({ closeAddStudentModal }) {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const toggleModelOpen = () => {
    closeAddStudentModal(); // Call the closeEditGroupModal function to close the modal
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    console.log('Added Student.');
    // Additional logic for student submission
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
        <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
          <div className="flex items-center justify-between space-x-4">
            <h1 className="text-xl font-bold text-gray-800">
              Add a Student
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
                  Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
