import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';
import Finished from './components/Finished.js';

const App = ({indexValue}) => {
  const [name] = useState("Javier Muñoz")
  
  //localStorage.removeItem('index');
  //localStorage.removeItem('state');
  
  const [index, setIndex] = useState(indexValue);
  const [questions] = useState([
    {
        "id": 1,
        "question_type": "bools",
        "difficulty": "Alta",
        "text": "¿Huilo-Huilo es una region de Chile?",
        "correct_answer": "false",
        "order": 1,
        "test": 1,
        "tags": []
    },
    {
        "id": 2,
        "question_type": "multipleChoices",
        "difficulty": "Media",
        "text": "¿Donde se encuentra la universidad de los Andes?",
        "correct_answer": "true",
        "order": 2,
        "test": 1,
        "options": "Vitacura;La Dehesa;La Reina;Las Condes;Providencia",
        "tags": []
    }
  ])
  const [evaluations] = useState(
    {
      "id": 1,
      "test": "Math test",
      "group": "6ta Gen",
      "is_active": false,
      "name": "Geografia basica.",
      "created": "2023-05-29T06:16:39.826984Z",
      "limit_date": "2023-05-01T00:00:00Z",
      "general_instructions": "En este test, se abordarán conceptos básicos de geografía chilena, donde se evaluarán los conocimientos sobre esta materia. Durante el test, se presentarán preguntas relacionadas con distintos aspectos geográficos de Chile, relacionados a la ubicación en el mapa. ¡Buena suerte en el test!"
    }
  )

  let routeValue = ""
  if (questions.length == index){
    localStorage.setItem('state', 1);
    routeValue = "finished"
  } else {
    if (index == -1){
      routeValue = "homepage"
    } else{
      routeValue = "questions"
    }
  }
  const [route, setRoute] = useState(routeValue)

  let typeMessage
  const renderPage = () => {
    switch (route) {
      case 'homepage':
        return <Homepage setRoute={setRoute} setIndex={setIndex} evaluations={evaluations}/>;
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
