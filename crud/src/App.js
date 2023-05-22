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

function App() {
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
