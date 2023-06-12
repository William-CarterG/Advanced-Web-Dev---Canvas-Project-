import React, { useState, useEffect } from 'react';
import './main.css';

import Users from './components/users/Users';
import AddUser from './components/users/addUser';
import UserTable from './components/users/UserTable';

import Groups from './components/groups/Groups';
import GroupsTable from './components/groups/GroupsTable'
import AddGroup from './components/groups/addGroup';

import Evaluations from './components/evaluations/Evaluations';
import EvaluationTable from './components/evaluations/EvaluationsTable';
import AddEvaluation from './components/evaluations/addEvaluation';

import Tests from './components/tests/Tests';
import TestsTable from './components/tests/TestsTable';
import AddTest from './components/tests/addTest';


// Adds the 'pressed-button' class so button looks pressed.
function buttonPressed(button) {
  button.classList.add('pressed-button');
}

// Resets buttons display, so it can properly show the new button being pressed right after.
function unpressedButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.classList.remove('pressed-button');
  });
}

function App({users, setUsers, groups, setGroups, evaluations, setEvaluations, tests, setTests}) {

  const [activeContainer, setActiveContainer] = useState('users');
  useEffect(() => {
    // Function to handle button click and add the 'pressed' class.
    function handleClick(event) {
      unpressedButtons(); // Remove 'pressed' class from all buttons.
      const button = event.target;
      buttonPressed(button);
    }

    // Attach click event listeners to the buttons.
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach((button) => {
      button.addEventListener('click', handleClick);
    });

    // Clean up the event listeners when the component unmounts.
    return () => {
      menuButtons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  // Columns names desired for each table. Remember to modify CSS table when adding/deleting columns.
  const tableHeaders = {
    users: ['Nombre Completo', 'Roles'],
    groups: ['Nombre de Grupo', 'N° de Miembros'],
    evaluations: ['Nombre de evaluacion', 'Fecha de Creacion', 'Fecha Limite'],
    tests: ['Nombre', 'N° de Preguntas']
  };

  // Fake data to fill user's table.
  console.log(users)
  const fakeUserData = users;

  const fakeGroupData = groups;
  
  const fakeEvaluationData = evaluations;

  const fakeTestData = tests;

  return (
    <>
      <h1  className='text-center pb-6'>Panel de Administracion</h1>
    
      <div className="mt-6 mb-8 md:flex md:items-center relative">  
        <div className="inline-flex absolute left-1/2 transform -translate-x-1/2">
          <Users onClick={() => setActiveContainer('users')} />
          <Groups onClick={() => setActiveContainer('groups')} />
          <Evaluations onClick={() => setActiveContainer('evaluations')} />
          <Tests onClick={() => setActiveContainer('tests')} />
        </div>
      </div>

      {/* When a button is clicked, it displays the information corresponding to it. */}
      {activeContainer==="users" && (
      <div>
        <UserTable
          data={fakeUserData} 
          headers={tableHeaders[activeContainer]} 
          setUsers = {setUsers}
        />
        <AddUser 
          container={activeContainer} 
          setUsers = {setUsers}
        />
      </div>
      )}

      {activeContainer==="groups" && (
      <div>
        <GroupsTable 
          data={fakeGroupData} 
          headers={tableHeaders[activeContainer]} 
          setGroups={setGroups}
        />
        <AddGroup 
          container={activeContainer} setGroups={setGroups}
        />
      </div>
      )}

      {activeContainer==="evaluations" && (
      <div>
        <EvaluationTable 
          data={fakeEvaluationData} 
          headers={tableHeaders[activeContainer]} 
        />
        <AddEvaluation setEvaluations={setEvaluations} groups={groups} tests={tests} />
      </div>
      )}

      {activeContainer==="tests" && (
      <div>
        <TestsTable 
          data={fakeTestData} 
          headers={tableHeaders[activeContainer]} 
        />
        <AddTest 
          container={activeContainer} 
        />
      </div>
      )}


    </>
  );
}

export default App;
