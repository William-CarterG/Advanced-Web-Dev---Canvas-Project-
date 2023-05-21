import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';

const App = () => {
  const [route, setRoute] = useState('home');

  const renderPage = () => {
    switch (route) {
      case 'homepage':
        return <Homepage />;
      case 'questions':
        return <Questions />;
    }
  };

  return (
    
    <div>
      <nav class="relative select-none bg-gray-700 lg:flex lg:items-stretch w-full h-16">
        <div class="flex flex-no-shrink items-stretch my-auto h-12">
          <img src={logo} alt="logo" class="App-logo w-20" />
        </div>
        <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
          <div class="lg:flex lg:items-stretch lg:justify-end ml-auto">
            <a onClick={() => setRoute('homepage')} class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center">Homepage</a>
            <a onClick={() => setRoute('questions')} class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center">Preguntas</a>
          </div>
        </div>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};



export default App;
