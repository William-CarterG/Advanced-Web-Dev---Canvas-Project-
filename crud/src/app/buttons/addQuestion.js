import React from 'react';
import addQuestionImg from './icon/addQuestion.png';


const AddQuestion = () => {
  return (
    <span className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
      
      <img
        className="mr-2 w-6 h-6"
        src={addQuestionImg}
      />
      Añadir Pregunta
    </span>
  );
};

export default AddQuestion;
