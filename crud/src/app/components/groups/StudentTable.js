import React, {useEffect } from 'react';
import startFetch from '../../../API';

const StudentTableComponent = ({ data, headers, setGroups, groupId, setStudents }) => {
    
    function deleteUser(id) {
        console.log(groupId,id)

        startFetch(`courses/${groupId}/members/${id}/`, 'DELETE', null, function(data) {
            startFetch(`courses/${groupId}/members/`, 'GET', null, function(data) {
                setStudents(data);
                startFetch(`courses/`, 'GET', null, function(data) {
                    setGroups(data);
                });
            });
        });
        
        
    }
    const fakeData = data;
    return (
        <div className="flex flex-col h-96 min-w-full py-6 align-middle">  
        <div className="flex-grow rounded-2xl overflow-auto"> 
            <table className="relative w-full border"> 
                <thead className="sticky top-0 px-6 py-3 bg-gray-50">
                    <tr>
                    {headers.map((header, index) => (
                    <th key={index}
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                        {header}
                    </th>
                    ))}
                    <th scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                        <span className="sr-only">Actions</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {fakeData.map((item) => (
                        <tr key={item.name} className="border-b hover:bg-gray-50">
                            <td className="p-4 text-center">{item.name}</td>
                            <td className="p-4 text-center">{item.last_name}</td>
                            <td className="p-4 text-center">{item.mail}</td>      
                            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {/* Delete button */}
                            <div className="inline-block text-left">
                                <button
                                onClick={() => deleteUser(item.id)}
                                type="button"
                                className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                id={`menu-button-${item.id}`}
                                aria-haspopup="true"
                                >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default StudentTableComponent;
