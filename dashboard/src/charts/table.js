import React, { useState } from "react";

function Table({ headers, values, color, buttonColor, setRoute, setFromGroupToEval, setGeneralButton, setEvaluationsButton, setGroupsButton }) {
  const [reverseOrder, setReverseOrder] = useState(false);

  const reverseActualOrder = () => {
    setReverseOrder(!reverseOrder);
  };

  const tableValues = Object.values(values);
  const reversedTableValues = [...tableValues].reverse();
  const rows = reverseOrder ? reversedTableValues : tableValues;

  const handleButtonClick = (id) => {
    setFromGroupToEval(id)
    setGeneralButton("")
    setEvaluationsButton("bg-gradient-to-r from-[#36a2eb] to-[#ff6384] text-white font-bold")
    setGroupsButton("")
    setRoute("evaluations")
  };

  return (
    <div className="px-2 w-full">
      <div className="shadow overflow-y-auto rounded border-b border-gray-200 lg:max-h-[22vh] max-h-[45vh]">
        <table className="min-w-full bg-white">
          <thead className={`${color} text-white sticky top-0`}>
            <tr>
              <th className="w-2/3 text-left py-3 lg:px-4 px-2 uppercase font-semibold text-sm">
                {headers[0]}
              </th>
              <th className="w-1/3 text-left py-3 lg:px-4 px-2 uppercase font-semibold text-sm">
                <div className="flex justify-between">
                  <div className="my-auto">{headers[1]}</div>
                  <div>
                    <button
                      className={`mx-2 ${buttonColor} text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
                      onClick={reverseActualOrder}
                    >
                      {reverseOrder ? "ASC" : "DESC"}
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rows.map((value, index) => (
              <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                <td className="text-left py-2 lg:px-4 px-2">
                  {value["name"]}
                </td>
                <td className="text-left py-2 lg:px-4 px-2">
                  {value["count"] !== -1 ? (
                    value["count"]
                  ) : (
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleButtonClick(value.id)}
                    >
                      Button
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
