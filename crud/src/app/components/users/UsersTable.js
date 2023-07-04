import React, { useState, useEffect, useRef } from 'react';
import EditUser from './crud/editUser';
import startFetch from '../../../API';
import Edit from '../../buttons/edit';
import Delete from '../../buttons/delete';
import More from '../../buttons/more';


// Credits to TailwindComponents user 'BrendaMorales97' for 
// creating a good part of this table.

const CheckRole = ({ role }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${role ? 'text-green-500' : 'text-red-500'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    {role ? (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    )}
  </svg>
);


const TableRow = ({ user, setUsers }) => {
  // Component is being rendered twice, for some reason...
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  // Closes side menu.
  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  // Opens modal to edit user.
  const openEditUserModal = () => {
    handleToggleMenu();
    setIsEditUserOpen(!isEditUserOpen);
  };

  const deleteUser = () => {
    startFetch(`users/${user.id}/`, 'DELETE', null, function(data) {
      startFetch(`users/`, 'GET', null, function(data) {
        setUsers(data);
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
    <tr key={user.name} className="border-b hover:bg-gray-50">
      <td className="p-4">{user.username}</td>
      {/* User roles*/}
      <td className="whitespace-nowrap px-3 py-4 text-sm ">
        <span className="flex justify-center">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className='mx-auto'>
              {/* Admin User role */}
              <CheckRole role={user.groups.includes("admin")} />
            </div>
            <div className='mx-auto'>  
              {/* Evaluator User role */}
              <CheckRole role={user.groups.includes("evaluator")} />
            </div>    
            <div className='mx-auto'>
              {/* Visualizer User role */}
              <CheckRole role={user.groups.includes("watcher")} />
            </div>
          </div>
        </span>
      </td>

      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {/* Edit and delete side menu */}
        <div className="inline-block text-left" ref={menuRef}>
          <button
            onClick={handleToggleMenu}
            type="button"
            className="flex users-center text-gray-400 hover:text-gray-600 focus:outline-none"
            id={`menu-button-${user.id}`}
            aria-expanded={openMenu}
            aria-haspopup="true"
          >
            <span className="sr-only"></span>
            <More />
          </button>
          {openMenu && (
            <div
              className="origin-top-right absolute right-16 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`menu-button-${user.id}`}
              tabIndex="-1"
            >
              <div className="" onClick={openEditUserModal} role="none">
                <Edit />
              </div>

              <div className="" onClick={deleteUser} role="none">
                <Delete />
              </div>
            </div>
          )}
        </div>
        {isEditUserOpen && (
          <EditUser 
            closeEditUserModal={openEditUserModal} 
            groups={user.groups} 
            setUsers = {setUsers}
            id = {user.id}
            user = {user}
          />
        )}
      </td>
    </tr>
  );
};


const UserTableComponent = ({ data, headers, setUsers }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    startFetch(`users/`, 'GET', null, function(data) {
      setUserData(data);
    });
  });

  return (
    <div className="mt-10 flex flex-col h-[65vh] min-w-full py-6 align-middle">  
      <div className="flex-grow rounded-2xl overflow-auto bg-white"> 
        <table className="relative w-full border"> 
          <thead className="sticky top-0 px-6 py-3 bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-3 py-3.5 text-center text-lg font-semibold text-gray-900"
              >
                {header}
                {header === "Roles" && (
                  <div className="grid grid-cols-3 ">
                    <div>Admin</div>
                    <div>Evaluador</div>
                    <div>Visualizador</div>
                  </div>
                )}
              </th>
            ))}
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {userData.map((user) => (
              <TableRow key={user.id} user={user} setUsers={setUsers} />     
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableComponent;
