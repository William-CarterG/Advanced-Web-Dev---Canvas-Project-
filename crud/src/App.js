import React, { useState, useEffect } from 'react';
import './App.css';
import './main.css';

function handleUsersButtonClick() {
  // Navigate to the Users CRUD page
  console.log("Users CRUD clicked.");
}

function handleGroupsButtonClick() {
  // Navigate to the Groups CRUD page
  console.log("Groups CRUD clicked.");
}

function handleEvaluationsButtonClick() {
  // Navigate to the Evaluations CRUD page
  console.log("Evaluations CRUD clicked.");
}

function handleTestsButtonClick() {
  // Navigate to the Tests CRUD page
  console.log("Tests CRUD clicked.");
}

function buttonPressed(button) {
  button.classList.add('pressed-button');
}

function unpressedButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.classList.remove('pressed-button');
  });
}

function App() {
  useEffect(() => {
    // No need to attach event listeners manually
    // Instead, handle button clicks within the component

    // Function to handle button click and add the 'pressed' class
    function handleClick(event) {
      unpressedButtons(); // Remove 'pressed' class from all buttons
      const button = event.target;
      buttonPressed(button);
    }

    // Attach click event listeners to the buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      button.addEventListener('click', handleClick);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <>
      <h1>Welcome to the Administration Panel</h1>
      <button className="button" onClick={handleUsersButtonClick}>
        Manage Users
      </button>
      <button className="button" onClick={handleGroupsButtonClick}>
        Manage Groups
      </button>
      <button className="button" onClick={handleEvaluationsButtonClick}>
        Manage Evaluations
      </button>
      <button className="button" onClick={handleTestsButtonClick}>
        Manage Tests
      </button>
    </>
  );
}

export default App;
