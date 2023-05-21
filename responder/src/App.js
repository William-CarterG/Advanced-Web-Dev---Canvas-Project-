import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Homepage from './components/Homepage.js';
import Questions from './components/Questions.js';

const App = () => {
  const [route, setRoute] = useState('homepage');

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
      <nav class="relative select-none bg-gray-700 flex items-stretch w-full h-16">
        <div class="flex  my-auto h-12">
          <img src={logo} alt="logo" class="App-logo w-20" />
          <a onClick={() => setRoute('homepage')}  class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center text-xl">Homepage</a>
          <a onClick={() => setRoute('questions')} class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center text-xl">Preguntas</a>
        </div>
      </nav>
      <div>{renderPage()}</div>
    </div>
  );
};



export default App;
