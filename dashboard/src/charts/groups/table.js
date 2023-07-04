function Table({ headers, values, color }) {
    return (
      <div className="px-2 py-8 w-full">
        <div className="shadow overflow-y-auto rounded border-b border-gray-200 lg:max-h-[25vh] max-h-[45vh]">
          <table className="min-w-full bg-white">
            <thead className={`${color} text-white`}>
              <tr>
                <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                  {headers[0]}
                </th>
                <th className="w-1/2 text-left py-3 px-4 uppercase font-semibold text-sm">
                  {headers[1]}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {Object.values(values).map((value, index) => (
                <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                  <td className="text-left py-2 px-4">{value["name"]}</td>
                  <td className="text-left py-2 px-4">{value["amount"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default Table;
  