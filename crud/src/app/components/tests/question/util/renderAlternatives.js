import React, { useState, useEffect } from "react";

const RenderAlternatives = ({ data, setAlternatives, setAnswer }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [options, setOptions] = useState([]);
  const [correctChoice, setCorrectChoice] = useState(0);

  useEffect(() => {
    setSelectedTab(data.question_type);
    if (data.options.length > 1){
      localStorage.setItem("changeOptionsId", data.options[data.options.length-1].id)
      setOptions(data.options[data.options.length-1].options.split(";"))
      console.log(data.options)
      const correctChoiceIndex = options.indexOf(data.correct_answer);
      console.log(correctChoiceIndex, options);
      setCorrectChoice(correctChoiceIndex);
    }
    else if (data.options && data.question_type === "Alternativas") {
      setOptions(data.options[0].options.split(";"));
      const correctChoiceIndex = data.options.indexOf(data.correct_answer);
      setCorrectChoice(correctChoiceIndex);
    } 
    else if (
      data.options &&
      (data.question_type === "Semi-abierta" ||
        data.question_type === "Matriz")
    ) {
      setOptions(data.options[0].options.split(";"));
      const correctChoiceIndex = data.options.indexOf(data.correct_answer);
      setCorrectChoice(correctChoiceIndex);
    } 
    else if (data.question_type === "Verdadero o Falso") {
      let boolIndex = data.correct_answer === "Falso" ? 1 : 0;
      setCorrectChoice(boolIndex);
    }
  }, [data]);

  const handleAlternativeChange = (e, index) => {
    const updatedAlternatives = [...options];
    updatedAlternatives[index] = e.target.value;
    setOptions(updatedAlternatives);
    setAlternatives(updatedAlternatives.join(";"));
  };

  const handleDeleteAlternative = (index) => {
    let updatedAlternatives = [...options];
    updatedAlternatives.splice(index, 1);
    setOptions(updatedAlternatives);
    setAlternatives(updatedAlternatives.join(";"));
  };

  const handleAddAlternative = () => {
    const newAlternative = `Nueva Alternativa`;
    setOptions([...options, newAlternative]);
  };

  const handleOptionSelection = (index) => {
    if (selectedTab === "Verdadero o Falso") {
      setAnswer(index === 0 ? "Verdadero" : "Falso");
      setCorrectChoice(index === 0 ? 0 : 1);
    } else {
      setAnswer(options[index]);
      setCorrectChoice(index);
    }
  };

  if (
    selectedTab === "Alternativas" ||
    selectedTab === "Semi-abierta" ||
    selectedTab === "Matriz"
  ) {
    return (
      <div>
        {options.map((alternative, index) => (
          <div key={index} className="flex items-center" id={`alternativa${index}`}>
            {selectedTab !== "Matriz" && (
              <input
                type="radio"
                onChange={() => handleOptionSelection(index)}
                className="w-4 h-4 mr-2"
                checked={index === correctChoice}
              />
            )}
            <input
              type="text"
              value={alternative}
              onChange={(e) => handleAlternativeChange(e, index)}
              className="block w-full px-3 py-2 mt-1 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
            {/* Delete alternative */}
            <button onClick={() => handleDeleteAlternative(index)} className="flex items-center ml-1 mt-1">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ))}
        {options.length < 6 && (
          <button onClick={handleAddAlternative} className="flex items-center ml-2 mb-5 mt-1">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Agregar Alternativa
          </button>
        )}
      </div>
    );
  } else if (selectedTab === "Verdadero o Falso") {
    return (
      <div className="flex flex-row mt-3">
        <div className="flex items-center mr-3" id="alternativa0">
          <input
            type="radio"
            onChange={() => handleOptionSelection(0)}
            value={"Verdadero"}
            className="w-4 h-4 mr-2"
            checked={correctChoice === 0}
          />

          <span className="text-gray-600">Verdadero</span>
        </div>
        <div className="flex items-center" id="alternativa1">
          <input
            type="radio"
            onChange={() => handleOptionSelection(1)}
            value={"Falso"}
            className="w-4 h-4 mr-2"
            checked={correctChoice === 1}
          />
          <span className="text-gray-600">Falso</span>
        </div>
      </div>
    );
  } else if (selectedTab === "Numerica") {
    return (
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
