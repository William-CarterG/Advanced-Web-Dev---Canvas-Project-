import React, { useState, useEffect, useRef } from 'react';
import AddStudent from './students/crud/addStudent';
import ViewGroup from './viewDetails';
import startFetch from '../../../API';
import Delete from '../../buttons/delete';
import More from '../../buttons/more';
import Details from '../../buttons/details';
import AddStudentButton from '../../buttons/addStudent';

// Credits to TailwindComponents user 'BrendaMorales97' for 
// creating a good part of this table.

const TableRow = ({ item, setGroups }) => {
  // Component is being rendered twice, for some reason...
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [isViewGroupOpen, setIsViewGroupOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const openViewGroupModal = () => {
    toggleMenu();
    setIsViewGroupOpen(!isViewGroupOpen);
  };

  const openAddStudentModal = () => {
    toggleMenu();
    setIsAddStudentOpen(!isAddStudentOpen);
  };

  const deleteGroup = () => {
    startFetch(`courses/${item.id}/`, 'DELETE', null, function(data) {
      startFetch(`courses/`, 'GET', null, function(data) {
        setGroups(data);
      });
    });
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
      <td className="p-4">{item.members_count}</td>

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
            <More />
          </button>
          {openMenu && (
            <div className="origin-top-right absolute right-12 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`menu-button-${item.id}`}
              tabIndex="-1"
            >
              <div className="" onClick={openViewGroupModal} role="none">
                <Details />
              </div>

              <div className="" onClick={openAddStudentModal} role="none">
                <AddStudentButton />
              </div>

              <div className="" onClick={deleteGroup} role="none">
                <Delete />
              </div>
            </div>
          )}
        </div>
        {isAddStudentOpen && (
          <AddStudent
            closeAddStudentModal={openAddStudentModal} id={item.id} setGroups={setGroups}
          />
        )}

        {isViewGroupOpen && (
          <ViewGroup 
            closeViewGroupModal={openViewGroupModal} id={item.id} setGroups={setGroups}
          />
        )}

      </td>
    </tr>
  );
};


const GroupTableComponent = ({ data, headers, setGroups }) => {
  const [groupData, setGroupData] = useState(data);

  useEffect(() => {
    startFetch(`courses/`, 'GET', null, function(data) {
      setGroupData(data);
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
            {groupData.map((item) => (
              <TableRow key={item.id} item={item} setGroups={setGroups}/>
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTableComponent;
