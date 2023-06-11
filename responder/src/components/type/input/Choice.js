import React from 'react';

const Choice = ({setSelect, text}) => {

    return (
        <button className="group h-10 border-2 border-gray-300 rounded-full transition duration-300 focus:bg-blue-100" 
            onClick={() => {
                setSelect(text)
            }}>
            <div className="relative flex items-center space-x-4 justify-center">
                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 ">{text}</span>
            </div>
        </button>
    );
  };
    
export default Choice;