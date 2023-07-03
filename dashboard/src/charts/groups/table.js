function Table({ headers, values, color }) {
    return (
        <div className="px-2 py-8 w-full">
            <div
                className="shadow overflow-y-auto rounded border-b border-gray-200 max-h-[20vh]">
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
                        <tr>
                            <td className="text-left py-2 px-4">{values[1]["name"]}</td>
                            <td className="text-left py-2 px-4">{values[1]["amount"]}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="text-left py-2 px-4">{values[2]["name"]}</td>
                            <td className="text-left py-2 px-4">{values[2]["amount"]}</td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 px-4">{values[3]["name"]}</td>
                            <td className="text-left py-2 px-4">{values[3]["amount"]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
