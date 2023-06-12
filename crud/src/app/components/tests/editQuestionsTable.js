import { useState } from 'react';

const EditQuestionsTable = () => {
  const [questionData, setQuestionData] = useState([
    { question: 'What is kind of element would you use to create a table in HTML.', type: 'Multiple Choice' },
    { question: 'How much is 1+1', type: 'Multiple Choice' },
    { question: 'Does the CSS logo have any blue on it?', type: 'Bool' },
  ]);

  const moveRowUp = (index) => {
    if (index > 0) {
      const updatedData = [...questionData];
      const temp = updatedData[index - 1];
      updatedData[index - 1] = updatedData[index];
      updatedData[index] = temp;
      setQuestionData(updatedData);
    }
  };

  const moveRowDown = (index) => {
    if (index < questionData.length - 1) {
      const updatedData = [...questionData];
      const temp = updatedData[index + 1];
      updatedData[index + 1] = updatedData[index];
      updatedData[index] = temp;
      setQuestionData(updatedData);
    }
  };

  return (
    <table className="relative w-full border">
        <thead className="sticky top-0 px-6 py-3 bg-gray-50">
            <tr>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Question</th>
            <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Type</th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
            </th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
            {questionData.map((question, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 text-center">{question.question}</td>
                <td className="p-4 text-center">{question.type}</td>
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
            </tr>
            ))}
        </tbody>
    </table>
  );
};

export default EditQuestionsTable;
