import React from 'react';

const Edit = () => {

    return (   
        <span className="flex users-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
            <svg className='h-6 w-6 mr-2' fill="none" stroke="#000000" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Editar
        </span>
    );
  };
    
export default Edit;