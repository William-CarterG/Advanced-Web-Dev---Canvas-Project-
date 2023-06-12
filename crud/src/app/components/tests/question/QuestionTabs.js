import React from 'react';

const QuestionTabs = () => {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-1">
        <ul className="flex items-center gap-2 text-sm font-medium">
          <li className="flex-1">
            <a
              href="#"
              className="text-gra relative flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 shadow hover:bg-white hover:text-gray-700"
            >
              Verdadero o Falso
            </a>
          </li>
          <li className="flex-1">
            <a
              href="#"
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow"
            >
              Alternativa Múltiple
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionTabs;
