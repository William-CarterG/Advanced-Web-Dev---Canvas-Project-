import React, { useState, useEffect, useRef } from 'react';

// Credit to TailwindComponents user 'BrendaMorales97', who created a good part 
// of the table's structure 

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
              className="origin-top-right absolute right-16 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`menu-button-${item.id}`}
              tabIndex="-1"
            >
              <div className="" role="none">
                <a
                  className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id={`menu-item-0-${item.id}`}
                  href="*"
                >
                    <a x-data="{ tooltip: 'Edit' }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                        >
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                        </svg>
                    </a>
                    Edit
                </a>
              </div>
              <div className="" role="none">
                <a
                  className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex="-1"
                  id={`menu-item-1-${item.id}`}
                  href = "*"
                >
                    <a x-data="{ tooltip: 'Delete' }">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </a>
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
