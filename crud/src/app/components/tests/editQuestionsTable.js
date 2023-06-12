import { useState, useEffect } from 'react';
import startFetch from '../../../API';
import { start } from '@popperjs/core';

const EditQuestionsTable = ({ item, setTests }) => {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    startFetch(`tests/${item.id}/questions`, 'GET', null, function (data) {
      setQuestionData(data);
    });
  }, []);

  function handleDeleteQuestion(question_id){
    startFetch(`tests/${item.id}/questions/${question_id}`, 'DELETE', null, function(data) {
      startFetch(`tests/${item.id}/questions/`, 'GET', null, function(data) {
        setQuestionData(data);
        startFetch(`tests/`, 'GET', null, function(data) {
          setTests(data);
        });
      });
    });
  };

  const moveRowUp = (index) => {
    if (index > 0) {
      const updatedData = [...questionData];
      const temp = updatedData[index - 1];
      updatedData[index - 1] = updatedData[index];
      updatedData[index - 1].order = index;
      updatedData[index] = temp;
      updatedData[index].order = index + 1;
      setQuestionData(updatedData);
      console.log("New order:", item.id);
      let orderList = []
      updatedData.forEach((question) => {
        orderList.push(question.id);
      });
      let body = {'sorted_questions': orderList};
      startFetch(`tests/${item.id}/questions/change_questions_order/`, 'PATCH', body, function(data){
        console.log("Terminé de ordenar");
      });
    }
  };


  const moveRowDown = (index) => {
    if (index < questionData.length - 1) {
      const updatedData = [...questionData];
      const temp = updatedData[index + 1];
      updatedData[index + 1] = updatedData[index];
      updatedData[index + 1].order = index + 2;
      updatedData[index] = temp;
      updatedData[index].order = index + 1;
      setQuestionData(updatedData);
      console.log("New order:", item.id);
      let orderList = []
      updatedData.forEach((question) => {
        orderList.push(question.id);
      });
      let body = {'sorted_questions': orderList};
      startFetch(`tests/${item.id}/questions/change_questions_order/`, 'PATCH', body, function(data){
        console.log("Terminé de ordenar");
      });
    }
  };

  return (
    <table className="relative w-full border">
      <thead className="sticky top-0 px-6 py-3 bg-gray-50">
        <tr>
          <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Pregunta</th>
          <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Tipo de Pregunta</th>
          <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Dificultad</th>
          <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Actions</span>
          </th>
          <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {questionData.map((question, index) => (
          <tr key={`${question.id}`} id={`${question.id}`} className="border-b hover:bg-gray-50">
            <td className="p-4 text-center">{question.text}</td>
            <td className="p-4 text-center">{question.question_type}</td>
            <td className="p-4 text-center">{question.difficulty}</td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <div className="inline-block text-left">
                <button
                  type="button"
                  className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-haspopup="true"
                  onClick={() => moveRowUp(index)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-haspopup="true"
                  onClick={() => moveRowDown(index)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
            </td>
            <td>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditQuestionsTable;
