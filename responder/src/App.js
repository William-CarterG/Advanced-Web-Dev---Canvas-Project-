import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';
import Finished from './components/Finished.js';


const App = () => {
  const [name] = useState("Javier Muñoz")
  const [route, setRoute] = useState('homepage')
  let [index,setIndex] = useState(-1)
  const [questions] = useState([
    {
        "id": 1,
        "question_type": "bools",
        "difficulty": "Alta",
        "text": "Indique la respuesta correcta.",
        "correct_answer": "false",
        "order": 1,
        "test": 1,
        "tags": []
    },
    {
        "id": 2,
        "question_type": "multipleChoices",
        "difficulty": "Media",
        "text": "Indique la respuesta correcta.",
        "correct_answer": "true",
        "order": 2,
        "test": 1,
        "tags": []
    },
    {
      "id": 3,
      "question_type": "matrix",
      "difficulty": "Media",
      "text": "Indique la respuesta correcta.",
      "correct_answer": "true",
      "order": 2,
      "test": 1,
      "tags": []
  }
  ])
  let typeMessage
  const renderPage = () => {
    switch (route) {
      case 'homepage':
        return <Homepage setRoute={setRoute} setIndex={setIndex}/>;
      case 'questions':
        switch (questions[index]["question_type"]) {
          case "bools":
            typeMessage = "Indique.."
            break
          case "multipleChoices":
            typeMessage = "Selecciona la alternativa correcta.."
            break
          case "semiOpen":
            typeMessage = "Conteste la pregunta anterior.."
            break
          case "number":
            typeMessage = "Es equivalente a.."
            break
          case "matrix":
            typeMessage = "Rellene las casillas.."
            break
        }
        return <Questions question={questions[index]} index={index} setIndex={setIndex} countOfQuestions={questions.length} description={typeMessage} setRoute={setRoute}/>;
      case 'finished':
        return <Finished/>;
    }
  };

  return (
    <div>
      <nav class="relative select-none bg-gray-700 flex items-stretch w-full h-16">
        <div class="flex my-auto h-12 justify-between w-full">
          <div>
            <img src={logo} alt="logo" class="App-logo w-16" />
          </div>
          <div className='pr-5 my-auto text-white text-lg'>
            {name}
          </div>
        </div>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};

export default App;
