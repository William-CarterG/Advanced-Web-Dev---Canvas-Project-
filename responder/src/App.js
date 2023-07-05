import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';
import Finished from './components/Finished.js';

const App = ({fontColor, bgColor, matrixChoice, indexValue, fullName, evaluation, questionsa, evToken, tokenState, ended, personTestId}) => {
  const [index, setIndex] = useState(indexValue);

  let routeValue = ""
  // eslint-disable-next-line
  if (ended == 1){
    tokenState[evToken]["state"] = 1
    localStorage.setItem('tokenState', JSON.stringify(tokenState));
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
        return <Homepage fontColor={fontColor} bgColor={bgColor}  setRoute={setRoute} setIndex={setIndex} evaluations={evaluation} evToken={evToken} tokenState={tokenState} personTestId={personTestId}/>;
      case 'finished':
        return <Finished index={questionsa.length} evToken={evToken} tokenState={tokenState}/>;
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
        return <Questions fontColor={fontColor} bgColor={bgColor}  matrixChoice={matrixChoice} question={questionsa[index]} index={index} setIndex={setIndex} countOfQuestions={questionsa.length} description={typeMessage} setRoute={setRoute} evToken={evToken} tokenState={tokenState} personTestId={personTestId}/>;
      default:
        // do nothing
      
    }
  };


  return (
    <div>
      <nav className={`relative select-none flex items-stretch w-full h-16`} style={{ backgroundColor: bgColor }}>
        <div className="flex my-auto h-12 justify-between w-full">
          <div>
            <img src={logo} alt="logo" className="App-logo w-16" />
          </div>
          <div className={`pr-5 my-auto text-white  text-lg`} style={{ color: fontColor }}>
            {fullName}
          </div>
        </div>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};

export default App;
