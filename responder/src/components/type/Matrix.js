import React from 'react';
import Choice from './input/Checkbox.js';

const Matrix = () => {

    return (
        <div>
            <div className="grid space-y-4 overflow-x-auto">
                <table>
                    <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                            <th></th>
                            <th className="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N x 0
                            </th>
                            <th className="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N x 1
                            </th>
                            <th className="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N / N
                            </th>
                            <th className="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                0 / N
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="divide-x divide-gray-200">
                            <td className="text-sm text-center px-2">0</td>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-700"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                        </tr>
                        <tr className="divide-x divide-gray-200 bg-gray-50">
                            <td className="text-sm text-center px-2">1</td>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-700"}/>
                        </tr>
                        <tr className="divide-x divide-gray-200">
                            <td className="text-sm text-center px-2">N</td>
                            <Choice status={"text-gray-700"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
  };
    
export default Matrix;