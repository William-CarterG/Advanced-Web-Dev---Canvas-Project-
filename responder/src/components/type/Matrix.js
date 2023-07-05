import React, { useState, useEffect } from 'react';
import Choice from './input/Checkbox.js';

const Matrix = ({ matrixChoice, setSelect, options, enun }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [internalOption, setInternalOption] = useState();
  const toggleOption = (rowIndex, colIndex) => {
    const updatedOptions = selectedOptions.map((row, i) => {
      if (i === rowIndex) {
        return row.map((option, j) => (j === colIndex ? !option : false));
      }
      return row;
    });
    setSelectedOptions(updatedOptions);
  };

  useEffect(() => {
    const initialOptions = enun.map(() => Array(options.length).fill(false));
    setSelectedOptions(initialOptions);
  }, [options, enun]);

  useEffect(() => {
    let selectedValues = selectedOptions.map((row) => {
      const selectedColumns = row.reduce((columns, option, index) => {
        if (option) {
          columns.push(options[index]);
        }
        return columns;
      }, []);
      return selectedColumns.join(';');
    }).join(';');
    setInternalOption(selectedValues)
  }, [selectedOptions, options]);

  useEffect(() => {
    matrixChoice[0] = internalOption
  }, [internalOption]);

  const renderChoices = () => {
    if (options.length === 0 || enun.length === 0) return null;

    return (
      <>
        {enun.map((row, rowIndex) => (
          <tr className="divide-x divide-gray-200" key={rowIndex}>
            <td className="text-sm text-center px-2">{row}</td>
            {options.map((option, colIndex) => (
              <td key={colIndex} className="flex-1">
                <div onClick={() => toggleOption(rowIndex, colIndex)}>
                  <Choice
                    status={
                      selectedOptions[rowIndex] &&
                      selectedOptions[rowIndex][colIndex]
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }
                  />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="grid space-y-4 overflow-x-auto">
        <table>
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              <th></th>
              {options.map((option, colIndex) => (
                <th
                  key={colIndex}
                  className="px-2 py-2 text-sm font-normal text-center text-gray-500"
                >
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderChoices()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Matrix;
