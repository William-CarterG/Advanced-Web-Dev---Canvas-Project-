import React, { useState, useEffect, useRef } from 'react';
import Details from '../../buttons/details.js';
import More from '../../buttons/more.js';
import Delete from '../../buttons/delete.js';
import AddQuestion from '../../buttons/addQuestion.js';
import AddTestQuestion from './question/crud/addQuestion.js';
import startFetch from '../../../API';
import QuestionsTable from './question/QuestionsTable.js';

const TableRow = ({ item, setTests, setSelectedTest }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [addTestVisible] = useState(false);
  const [viewTestVisible, setViewTestVisible] = useState(false);
  const [AddTestQuestionVisible, setAddTestQuestionVisible] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const testDetails = () => {
    toggleMenu();
    setViewTestVisible(!viewTestVisible);
    setSelectedTest(item);
  };

  const addQuestion = () => {
    toggleMenu();
    setAddTestQuestionVisible(!AddTestQuestionVisible);
  };

  const deleteGroup = () => {
    toggleMenu();
    startFetch(`tests/${item.id}/`, 'DELETE', null, function(data) {
      startFetch(`tests/`, 'GET', null, function(data) {
        setTests(data);
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <tr key={item.name} className="border-b h-16 hover:bg-gray-50">
      <td>{item.name}</td>
      <td>{item.questions_count}</td>

      <td>
        <div ref={menuRef}>
          <div onClick={toggleMenu} className="flex items-center text-gray-400">
            <More />
          </div>
          {openMenu && (
            <div className="origin-top-right absolute right-12 w-44 rounded-md shadow-lg bg-white divide-y divide-gray-100">
              <div onClick={testDetails}>
                <Details />
              </div>

              <div onClick={addQuestion}>
                <AddQuestion />
              </div>

              <div onClick={deleteGroup}>
                <Delete />
              </div>
            </div>
          )}
          {AddTestQuestionVisible && (
            <AddTestQuestion toggleModelOpen={() => setAddTestQuestionVisible(!AddTestQuestionVisible)} setTests={setTests} item={item} />
          )}
          {addTestVisible && <addTest />}
        </div>
      </td>
    </tr>
  );
};

const TestTableComponent = ({ data, headers, setTests }) => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState(data);

  useEffect(() => {
    startFetch(`tests/`, 'GET', null, function(data) {
      setTestData(data);
    });
  });

  const goBack = () => {
    setSelectedTest(null);
  };

  return (
    <div className="mt-10 flex flex-col h-[65vh] py-6">
      {selectedTest && (
        <button onClick={goBack} className="mb-4 ml-4 p-2 bg-white text-[#282c34] hover:bg-[#1d232e] hover:text-white rounded-md duration-500">Volver a pruebas</button>
      )}
      <div className="flex-grow rounded-2xl overflow-auto bg-white">
        {selectedTest ? (
          <div>
            <QuestionsTable setTests={setTests} item={selectedTest} />
          </div>
        ) : (
          <table className="relative w-full border">
            <thead className="sticky top-0 px-6 py-3 bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-3 py-3 text-center text-lg font-semibold text-gray-900"
                  >
                    {header}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {testData.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  setTests={setTests}
                  setSelectedTest={setSelectedTest}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default TestTableComponent;
