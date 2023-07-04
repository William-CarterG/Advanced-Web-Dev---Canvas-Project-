import React, { useState, useEffect } from 'react';

const ColorPicker = ({ prevColor, setColor }) => {
  const [selectedColor, setSelectedColor] = useState('#2d3748');
  const [isColorOptionsVisible, setColorOptionsVisible] = useState(false);

  const colorOptions = [
    '#2196F3',
    '#009688',
    '#4CAF50',
    '#FFEB3B',
    '#DDD06A',
    '#2d3748',
    '#F56565',
    '#ed64a6',
    '#9C27B0'
  ];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setColorOptionsVisible(false);
    setColor(color);
  };

  useEffect(() => {
    if(prevColor){
      setColor(prevColor);
      setSelectedColor(prevColor);
    }
  }, [prevColor, setColor]);

  const colorOptionRows = [];
  let row = [];
  for (let i = 0; i < colorOptions.length; i++) {
    row.push(colorOptions[i]);
    if ((i + 1) % 3 === 0 || i === colorOptions.length - 1) {
      colorOptionRows.push(row);
      row = [];
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder={selectedColor}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 w-24"
      />
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: selectedColor }}
          onClick={() => setColorOptionsVisible(!isColorOptionsVisible)}
        >
          <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M15.584 10.001L13.998 8.417 5.903 16.512 5.374 18.626 7.488 18.097z" />
            <path d="M4.03,15.758l-1,4c-0.086,0.341,0.015,0.701,0.263,0.949C3.482,20.896,3.738,21,4,21c0.081,0,0.162-0.01,0.242-0.03l4-1 c0.176-0.044,0.337-0.135,0.465-0.263l8.292-8.292l1.294,1.292l1.414-1.414l-1.294-1.292L21,7.414 c0.378-0.378,0.586-0.88,0.586-1.414S21.378,4.964,21,4.586L19.414,3c-0.756-0.756-2.072-0.756-2.828,0l-2.589,2.589l-1.298-1.296 l-1.414,1.414l1.298,1.296l-8.29,8.29C4.165,15.421,4.074,15.582,4.03,15.758z M5.903,16.512l8.095-8.095l1.586,1.584 l-8.096,8.096l-2.114,0.529L5.903,16.512z" />
          </svg>
        </div>
        {isColorOptionsVisible && (
          <div className="absolute top-0 left-full mt-2">
            <div className="bg-white p-2 rounded-md shadow-md">
              {colorOptionRows.map((row, index) => (
                <div key={index} className="flex space-x-2">
                  {row.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
