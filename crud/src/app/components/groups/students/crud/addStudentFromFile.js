import React, { useState } from 'react';
import startFetch from '../../../../../API';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Allowed extensions for input file
const allowedExtensions = ['csv', 'xlsx'];

function AddStudentFromFile({ id }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setError('');

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.name.split('.').pop();

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv or xlsx file');
        return;
      }

      setFile(inputFile);

      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        if (fileExtension === 'csv') {
          const csvData = Papa.parse(target.result, { header: true });
          const parsedData = csvData?.data;

          parsedData.forEach((row) => {
            let body = { name: row['NOMBRE'], last_name: row['APELLIDO'], mail: row['EMAIL'] };
            console.log(JSON.stringify(body));
            startFetch(`courses/${id}/members/`, 'POST', JSON.stringify(body), function (data) {});
          });
        }

        if (fileExtension === 'xlsx') {
          const data = new Uint8Array(target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          jsonData.forEach((row) => {
            let body = { name: row['NOMBRE'], last_name: row['APELLIDO'], mail: row['EMAIL'] };
            console.log(JSON.stringify(body));
            startFetch(`courses/${id}/members/`, 'POST', JSON.stringify(body), function (data) {});
          });
        }
      };

      if (fileExtension === 'csv') {
        reader.readAsText(inputFile);
      }

      if (fileExtension === 'xlsx') {
        reader.readAsArrayBuffer(inputFile);
      }
    }
  };

  return (
    <div className="">
      <div className="mt-1 flex justify-center" onDragOver={(e) => e.preventDefault()}>
        <div className="relative flex flex-row">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="absolute w-0 h-0 opacity-0"
            onChange={handleFileChange}
          />
          <button
            type="button"
            id="upload-file-button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#1d232e;] bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            {file ? file.name : 'Importar Estudiantes'}
          </button>
          <div className="mt-2">
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudentFromFile;
