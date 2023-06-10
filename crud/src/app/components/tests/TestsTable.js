import React, { useState, useEffect, useRef } from 'react';
import Details from '../../buttons/details.js';
import More from '../../buttons/more.js';
import Delete from '../../buttons/delete.js';
import AddQuestion from '../../buttons/addQuestion.js';

// Credits to TailwindComponents user 'BrendaMorales97' for 
// creating a good part of this table.

const TableRow = ({ item }) => {
  // Component is being rendered twice, for some reason...
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const testDetails = () => {
    toggleMenu();
    console.log("Se visualizan los detalles.")
  };

  const addQuestion = () => {
    toggleMenu();
    console.log("Se añade las preguntas.")
  };

  const deleteGroup = () => {
    toggleMenu();
    console.log("Se elimina la fila.")
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
    <tr key={item.name} className="border-b h-16 hover:bg-gray-50">
      <td> {item.name} </td>
      <td> {item.count} </td>

      <td>
        {/*View Details, Add user, Edit, Delete menu */}
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
        </div>
      </td>
    </tr>
  );
};


const TestTableComponent = ({ data, headers }) => {
  const fakeData = data;
  return (
    <div className="mt-10 flex flex-col h-[65vh] py-6">  
      <div className="flex-grow rounded-2xl overflow-auto"> 
        <table className="relative w-full h-full border"> 
          <thead className="sticky top-0 px-6 py-3 bg-gray-50">
            <tr>
              {headers.map((header, index) => (
              <th key={index}
                className="px-3 py-3 text-center text-lg font-semibold text-gray-900"
              >
                {header}
              </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {fakeData.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestTableComponent;