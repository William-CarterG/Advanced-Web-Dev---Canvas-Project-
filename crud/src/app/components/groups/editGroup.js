import React, { useState } from 'react';

function EditGroup({ closeEditGroupModal }) {
    const toggleModelOpen = () => {
        closeEditGroupModal(); // Call the closeEditGroupModal function to close the modal
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
            ></div>

            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-medium text-gray-800 ">Edit Group</h1>

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
                Here you may edit the group information.
              </p>

              <form className="mt-5">
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
                    className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                  />
                </div>

              </form>
            </div>
          </div>
        </div>
    );
};

export default EditGroup;