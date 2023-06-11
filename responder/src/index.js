import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import startFetch from './API';

localStorage.removeItem('index');
localStorage.removeItem('state');

const params = window.location.search;
const urlParams = new URLSearchParams(params);
const evToken = urlParams.get('ev_token');
let fetchedevaluation
let fetchedfullName
let fetchedquestion
if (evToken) {
  startFetch(`person-tests/?ev_token=${evToken}`, 'GET', null, function(data) {
    const personTest = data[0];
    const fetchedEvaluationId = personTest['evaluation'];
    const fetchedPersonId = personTest['person'];
    
    
    startFetch(`evaluations/${fetchedEvaluationId}`, 'GET', null, function(data) {
      fetchedevaluation = data;
      startFetch(`courses/${data["group_id"]}/members/${fetchedPersonId}`, 'GET', null, function(data) {
        fetchedfullName = data["name"] + " " + data["last_name"];
        startFetch(`tests/${fetchedevaluation["test_id"]}`, 'GET', null, function(data) {
          fetchedquestion = data["questions"];
          const RootComponent = () => {
            const [fullName, setFullName] = useState(null);
            const [evaluation, setEvaluation] = useState({});
            const [questions, setQuestions] = useState([]);
          
            useEffect(() => {
              const fetchedEvaluation = fetchedevaluation
              setEvaluation(fetchedEvaluation);
              
              const fetchedFullName = fetchedfullName
              setFullName(fetchedFullName);
              
              const fetchedQuestions = fetchedquestion
              setQuestions(fetchedQuestions);
          
            }, []);
            
          
            return (
              <React.StrictMode>
                <App indexValue={indexValue} fullName={fullName} evaluation={evaluation} questionsa={questions}/>
              </React.StrictMode>
            );
          };
          
          ReactDOM.render(
            <RootComponent />,
            document.getElementById('root')
          );
        });


      });
      
    });
  });
}


let indexValue = localStorage.getItem('index');
let readyState = localStorage.getItem('state');
if (indexValue === null) {
  indexValue = -1;
} else {
  if (readyState === null || readyState !== "1") {
    indexValue = parseInt(indexValue) + 1;
  }
  localStorage.setItem('index', indexValue);
}

