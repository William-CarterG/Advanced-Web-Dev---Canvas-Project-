import React, { useState, useEffect } from "react";

const RenderQuestion = ({ data }) => {
  const [editingquestion, setEditingQuestion] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    setQuestion(data.text);
  }, [data]);

  if (editingquestion) {
    return (
      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white text-black border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
        />
        <button onClick={() => setEditingQuestion(false)} className="flex items-center ml-2 mb-5 mt-1">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
            />
          </svg>
          Guardar
        </button>
      </div>
    );
  }  
  return (
    <div className="flex h-12">
      <input
        type="text"
        value={question}
        placeholder={question}
        readOnly={true}
        className="block w-6/12 px-3 py-2 mt-1 text-gray-600 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
      />
      <button
        onClick={() => setEditingQuestion(true)}
        className="flex items-center ml-2 mb-5 mt-4"
      >
        <svg
          className="h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Editar
      </button>
    </div>
  );
};
export default RenderQuestion;