function Table({ values, color }) {
    return (
        <div className="px-2 py-8 w-full">
            <div
                className="shadow overflow-y-auto rounded border-b border-gray-200 lg:max-h-[25vh] max-h-[45vh]">
                <table className="min-w-full bg-white">
                    <thead className={`${color} text-white`}>
                        <tr>
                            <th className="w-2/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Nombre de evaluacion
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Promedio de resultados %
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
