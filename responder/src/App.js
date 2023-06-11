import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';
import Finished from './components/Finished.js';

const App = ({indexValue, fullName, evaluation, questionsa}) => {
  const [index, setIndex] = useState(indexValue);

  let routeValue = ""
  // eslint-disable-next-line
  if (questionsa.length == index){
    localStorage.setItem('state', 1);
    routeValue = "finished"
  } else {
    if (index === -1){
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
        return <Homepage setRoute={setRoute} setIndex={setIndex} evaluations={evaluation}/>;
      case 'questions':
        switch (questionsa[index]["question_type"]) {
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
          default:
            // do nothing
          
        }
        return <Questions question={questionsa[index]} index={index} setIndex={setIndex} countOfQuestions={questionsa.length} description={typeMessage} setRoute={setRoute}/>;
      case 'finished':
        return <Finished index={questionsa.length}/>;
      default:
        // do nothing
      
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
            {fullName}
          </div>
        </div>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};

export default App;
