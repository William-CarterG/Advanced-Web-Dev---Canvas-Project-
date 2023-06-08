import React, { useState, useEffect, useRef } from 'react';

const TableRow = ({ item }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

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

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <tr key={item.name} className="border-b hover:bg-gray-50">
      <td className="p-4">{item.name}</td>
      <td className="p-4">{item.email}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
        <span className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        </span>
      </td>

      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
            <div
              className="origin-top-right absolute right-32 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`menu-button-${item.id}`}
              tabIndex="-1"
            >
              <div className="" role="none">
                <a
                  className="text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id={`menu-item-0-${item.id}`}
                >
                  Edit
                </a>
              </div>
              <div className="" role="none">
                <a
                  className="text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id={`menu-item-1-${item.id}`}
                >
                  Delete
                </a>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};





const TableComponent = ({ data, headers }) => {
    const fakeData = data;
    return (
        <div className="mt-3 rounded-2xl max-w-9xl mx-auto h-96 overflow-y-auto">
            <div className="inline-block min-w-full py-2 align-middle">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                                >
                                    {header}
                                </th>
                                ))}
                                <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                >
                                <span className="sr-only">Actions</span>
                                </th>
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
        </div>
    );
};

export default TableComponent;
