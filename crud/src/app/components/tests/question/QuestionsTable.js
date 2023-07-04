import { useState, useEffect } from 'react';
import startFetch from '../../../../API';
import EditTestQuestion from './crud/editQuestion';

const QuestionsTable = ({ item, setTests }) => {
  const [questionData, setQuestionData] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isEditTestQuestionViewing, setIsEditTestQuestionViewing] = useState(false);
  const [editQuestionValue, setEditQuestionValue] = useState(null);

  useEffect(() => {
    if(item.id){
      startFetch(`tests/${item.id}/questions`, 'GET', null, function (data) {
        setQuestionData(data);
      });
    }
  }, [item.id]); //aqui hice un cambio para que no tirara error

  function handleDeleteQuestion(question_id){
    startFetch(`tests/${item.id}/questions/${question_id}/`, 'DELETE', null, function(data) {
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

  const handleDragStart = (e, question) => {
    setDraggedItem(question);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, question) => {
    e.preventDefault();
  
    const updatedData = [...questionData];
    const draggedIndex = updatedData.findIndex((item) => item === draggedItem);
    const dropIndex = updatedData.findIndex((item) => item === question);
  
    // Swap the positions of the dragged item and the dropped item
    const temp = updatedData[draggedIndex];
    updatedData[draggedIndex] = updatedData[dropIndex];
    updatedData[dropIndex] = temp;
  
    // Update the order property of the questions
    updatedData.forEach((item, index) => {
      item.order = index + 1;
    });
  
    setQuestionData(updatedData);
    let orderList = []
    updatedData.forEach((question) => {
      orderList.push(question.id);
    });
    let body = JSON.stringify({'sorted_questions': orderList,});
    startFetch(`tests/${item.id}/questions/change_questions_order/`, 'PATCH', body, function(data){
    });
  };
  
  // Activates modal to edit question.
  function editQuestion(question){
    setIsEditTestQuestionViewing(true);
    setEditQuestionValue(question)
  }

  return (
    <div>
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
              <span className="sr-only">Edit</span>
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {questionData.map((question, index) => (
            <tr key={`${question.id}`} id={`${question.id}`} className="border-b hover:bg-gray-50"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, question)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, question)}>
              <td className="p-4 text-center">{question.text}</td>
              <td className="p-4 text-center">{question.question_type}</td>
              <td className="p-4 text-center">{question.difficulty}</td>
              {/* Move question up & down */}
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
              {/* Edit question */}
              <td>
                <button onClick={()  => editQuestion(question)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </td>
              {/* Delete question */}
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

      {(isEditTestQuestionViewing && (
        <EditTestQuestion toggleModelOpen={() => setIsEditTestQuestionViewing(!isEditTestQuestionViewing)} question={editQuestionValue}/>
      ))}
    </div>
  );
};

export default QuestionsTable;
