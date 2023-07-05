import React, { useState, useEffect } from "react";

const RenderAlternatives = ({ data, setAlternatives, setAnswer }) => {
    const [selectedTab, setSelectedTab] = useState('');
    const [options, setOptions] = useState([]);
    const [correctChoice, setCorrectChoice] = useState(0);

    useEffect(() => {
        setSelectedTab(data.question_type);
        console.log(data.options)
        if (data.options && data.question_type === "Alternativas" ){
          setOptions(data.options[0].options.split(";"));
          const correctChoiceIndex = data.options.indexOf(data.correct_answer);
          setCorrectChoice(correctChoiceIndex);
        }
        else if (data.options && data.question_type === "Semi-abierta" ){
          setOptions(data.options[0].options.split(";"));
          const correctChoiceIndex = data.options.indexOf(data.correct_answer);
          setCorrectChoice(correctChoiceIndex);
        }
        else if (data.options && data.question_type === "Matriz" ){
          setOptions(data.options[0].options.split(";"));
          const correctChoiceIndex = data.options.indexOf(data.correct_answer);
          setCorrectChoice(correctChoiceIndex);
        }
        else if (data.question_type === "Verdadero o Falso") {
          let boolIndex = (data.correct_answer === 'Falso') ? 1 : 0;
          setCorrectChoice(boolIndex);
        }
        
    }, [data]);
    
    const handleAlternativeChange = (e, index) => {
        const updatedAlternatives = [...options];
        updatedAlternatives[index] = e.target.value;
        setOptions(updatedAlternatives);
        setAlternatives(updatedAlternatives);
    };

    const handleDeleteAlternative = (index) => {
        let updatedAlternatives = [...options];
        updatedAlternatives.splice(index, 1);
        setOptions(updatedAlternatives);
        setAlternatives(updatedAlternatives);
    };

    const handleAddAlternative = () => {
        const newAlternative = `Nueva Alternativa`;
        setOptions([...options, newAlternative]);
    };

    const handleOptionSelection = (index) => { 
        if (selectedTab === 'verdaderoFalso'){
            setAnswer(index);
            setCorrectChoice(index);
        }
        else{
            setAnswer(options[index]);
            setOptions(options); 
        }
    };

    if (selectedTab === 'Alternativas' || selectedTab === 'Semi-abierta' || selectedTab === 'Matriz') {
      return (
        <div>
          {options.map((alternative, index) => (
            <div key={index} className="flex items-center" id={`alternativa${index}`}>
              {selectedTab !== 'matrix' && <input
                type="radio"
                onChange={() => handleOptionSelection(index)}
                className="w-4 h-4 mr-2"
                checked={index === correctChoice}
              />}
              <input
                type="text"
                value={alternative}
                onClick={() => console.log(alternative[0].options)}
                onChange={(e) => handleAlternativeChange(e, index)}
                className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
              />
              {/* Delete alternative */}
              <button
                onClick={() => handleDeleteAlternative(index)}
                className="flex items-center ml-1 mt-1"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
          {options.length < 6 && (
          <button
            onClick={handleAddAlternative}
            className="flex items-center ml-2 mb-5 mt-1"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Agregar Alternativa
          </button>
          )}   
        </div>
      );
    } else if (selectedTab === 'Verdadero o Falso') {
      return (
        <div className='flex flex-row mt-3'>
          <div className="flex items-center mr-3" id="alternativa0">
            <input
              type="radio"
              onChange={() => handleOptionSelection(0)}
              value={'Verdadero'}
              className="w-4 h-4 mr-2"
              checked={0 === correctChoice}
            />
            <span className="text-gray-600">Verdadero</span>
          </div>
          <div className="flex items-center" id="alternativa1">
            <input
              type="radio"
              onChange={() => handleOptionSelection(1)}
              value={'Falso'}
              className="w-4 h-4 mr-2"
              checked={1 === correctChoice}
            />
            <span className="text-gray-600">Falso</span>
          </div>
        </div>
      );
    } else if (selectedTab === 'Numerica') {
      return (
        // Numerical shouldn't have options/options like the others...
        // It should just have an input box that receives only numerical values (including floats)
        // and is always the correctChoice value (in other words, there is only one alternative and it's always the correctChoice one
        // so there is no need to select it ; just to make sure the correctChoice is being set properly)
        <div>
          <input
            type="number"
            placeholder={data.correct_answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
          />
        </div>
      );
    } 
    return null;
};

export default RenderAlternatives;