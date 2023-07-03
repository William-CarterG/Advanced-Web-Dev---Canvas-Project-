function Table({color}) {
    return (
        <div className="px-2 py-8 w-full">
            <div
                className="shadow overflow-y-auto rounded border-b border-gray-200 max-h-[25vh]">
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
                            <td className="text-left py-2 px-4">Matematicas Conicas</td>
                            <td className="text-left py-2 px-4">78</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="text-left py-2 px-4">Mecanica</td>
                            <td className="text-left py-2 px-4">73</td>
                        </tr>
                        <tr>
                            <td className="text-left py-2 px-4">Pensamiento Critico</td>
                            <td className="text-left py-2 px-4">71</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
