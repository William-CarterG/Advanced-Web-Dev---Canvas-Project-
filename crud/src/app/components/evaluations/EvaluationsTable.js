import React, { useState, useEffect, useRef } from 'react';
import ViewEvaluation from './viewEvaluation';
import startFetch from '../../../API';

// Credits to TailwindComponents user 'BrendaMorales97' for 
// creating a good part of this table.

const TableRow = ({ item, setEvaluations }) => {
  // Component is being rendered twice, for some reason...
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [isViewEvaluationOpen, setIsViewEvaluationOpen] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const openViewEvalationModal = () => {
    toggleMenu();
    setIsViewEvaluationOpen(!isViewEvaluationOpen);
  };

  const sendEvaluationReminder = () => {
    //Make request to send emails to all members of this evaluation.
  }

  const deleteEvaluation = () => {
    startFetch(`evaluations/${item.id}/`, 'DELETE', null, function(data) {
      startFetch(`evaluations/`, 'GET', null, function(data) {
        setEvaluations(data);
      });
    });
  }

  function formatDate(dateString){
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

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
    <tr key={item.name} className="border-b hover:bg-gray-50">
      <td className="p-4">{item.name}</td>
      <td className="p-4">{formatDate(item.created)}</td>
      <td className="p-4">{formatDate(item.limit_date)}</td>

      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {/*View Details, Add user, Edit, Delete menu */}
        <div className="inline-block text-left" ref={menuRef}>
          <button
            onClick={toggleMenu}
            type="button"
            className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            id={`menu-button-${item.id}`}
            aria-expanded={openMenu}
            aria-haspopup="true"
          >
            <span className="sr-only"></span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </button>
          {openMenu && (
            <div className="origin-top-right absolute right-12 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`menu-button-${item.id}`}
              tabIndex="-1"
            >
              <div className="" onClick={openViewEvalationModal} role="none">
                <span className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
                <svg className="mr-2 w-6 h-6" fill="none" stroke="#000000" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                  Ver Detalles
                </span>
              </div>

              <div className="" onClick={sendEvaluationReminder} role="none">
                <span className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
                <svg className="mr-2 w-6 h-6" fill="none" stroke="#000000" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                  Enviar recordatorio
                </span>
              </div>
              <div className="" onClick={deleteEvaluation} role="none">
                <span className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000000"
                    className="mr-2 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Borrar
                </span>
              </div>
            </div>
            
          )}
        </div>
        {isViewEvaluationOpen && (
          <ViewEvaluation 
            closeViewEvaluationModal={openViewEvalationModal} setEvaluations={setEvaluations} id={item.id} item={item}
          />
        )}
      </td>
    </tr>
  );
};


const EvaluationTableComponent = ({ data, headers, setEvaluations }) => {
  const [evaluationData, setEvaluationData] = useState(data);

  useEffect(() => {
    startFetch(`evaluations/`, 'GET', null, function(data) {
      setEvaluationData(data);
    });
  }, []);

  return (
    <div className="mt-10 flex flex-col h-[65vh] min-w-full py-6 align-middle">  
      <div className="flex-grow rounded-2xl overflow-auto bg-white"> 
        <table className="relative w-full border"> 
          <thead className="sticky top-0 px-6 py-3 bg-gray-50">
            <tr>
              {headers.map((header, index) => (
              <th key={index}
                scope="col"
                className="px-3 py-3.5 text-center text-lg font-semibold text-gray-900"
              >
                {header}
              </th>
              ))}
              <th scope="col"
              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
              >
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {evaluationData.map((item) => (
              <TableRow key={item.id} item={item} setEvaluations={setEvaluations} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvaluationTableComponent;
