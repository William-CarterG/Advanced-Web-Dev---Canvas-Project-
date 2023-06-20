import { useState, useEffect } from 'react';
import startFetch from '../../../API';

const EditQuestionsTable = ({ item, setTests }) => {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    startFetch(`tests/${item.id}/questions`, 'GET', null, function (data) {
      setQuestionData(data);
    });
  }, [item.id]); //aqui hice un cambio para que no tirara error

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
      let orderList = []
      updatedData.forEach((question) => {
        orderList.push(question.id);
      });
      let body = JSON.stringify({'sorted_questions': orderList,});
      startFetch(`tests/${item.id}/questions/change_questions_order/`, 'PATCH', body, function(data){
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
      let orderList = []
      updatedData.forEach((question) => {
        orderList.push(question.id);
      });
      let body = JSON.stringify({'sorted_questions': orderList,});
      startFetch(`tests/${item.id}/questions/change_questions_order/`, 'PATCH', body, function(data){
      });
    }
  };

  const handleTestDetails = (e) => {
    // Be careful with when you submit Test, because
    // there is a back button!!
    startFetch(`tests/${item.id}/questions`, 'GET', null, function(data) {
      setQuestionData(data);
      questionData.sort((a, b) => a - b);
      
    });
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
      <button onClick={handleTestDetails}
                className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                  Cambiar Orden
                  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                </button>
    </table>
  );
};

export default EditQuestionsTable;
