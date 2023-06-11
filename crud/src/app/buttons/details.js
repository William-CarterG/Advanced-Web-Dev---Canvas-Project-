import React from 'react';

const Details = () => {

    return (
        
        <span className="flex items-center text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm">
            <svg className="mr-2 w-6 h-6" fill="none" stroke="#000000" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Ver Detalles
        </span>

    );
  };
    
export default Details;