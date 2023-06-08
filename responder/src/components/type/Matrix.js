import React from 'react';
import Choice from './input/Checkbox.js';

const Matrix = () => {

    return (
        <div>
            <div className="flex justify-between mb-4">
                <span className=" text-xs">Indique los campos correctos:</span>
                <span className="text-xs">Pregunta 5 de 5</span>
            </div>
            <div class="grid space-y-4 overflow-x-auto">
                <table>
                    <thead class="bg-gray-50">
                        <tr class="divide-x divide-gray-200">
                            <th></th>
                            <th class="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N x 0
                            </th>
                            <th class="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N x 1
                            </th>
                            <th class="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                N / N
                            </th>
                            <th class="px-2 py-2 text-sm font-normal text-center text-gray-500">
                                0 / N
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="divide-x divide-gray-200">
                            <td class="text-sm text-center px-2">0</td>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-blue-500"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                        </tr>
                        <tr class="divide-x divide-gray-200 bg-gray-50">
                            <td class="text-sm text-center px-2">1</td>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-gray-400"}/>
                            <Choice status={"text-blue-500"}/>
                        </tr>
                        <tr class="divide-x divide-gray-200">
                            <td class="text-sm text-center px-2">N</td>
                            <Choice status={"text-blue-500"}/>
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