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

function App() {
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
    groups: ['Nombre de Grupo', 'Miembros'],
    evaluations: ['Nombre de evaluacion', 'Test', 'Gropo', 'Tiempo de entrega'],
    tests: ['Nombre', 'N° de Preguntas']
  };

  // Fake data to fill user's table.
  const fakeUserData = [
    { name: 'John Doe', email: 'johndoe@example.com', role: [1,2,3] },
    { name: 'Jane Smith', email: 'janesmith@example.com', role: [1,2] },
    { name: 'Michael Johnson', email: 'michaeljohnson@example.com', role: [1,3] },
    { name: 'Emily Davis', email: 'emilydavis@example.com', role: [2,3] },
    { name: 'Daniel Wilson', email: 'danielwilson@example.com', role: [2] },
    { name: 'Olivia Brown', email: 'oliviabrown@example.com', role: [3] },
  ];

  const fakeGroupData = [
    { name: 'Desarrollo Web Avanzado', members: 22},
    { name: 'Arquitectura de Computadores', members: 20},
    { name: 'Proyecto de Desarrollo de Software', members: 15},
  ];

  const fakeEvaluationData = [
    { name: 'Desarrollo Web Avanzado - Proyecto 1', test: 'CSS & HTML', group: 'Desarrollo Web Avanzado', deadline: '22/04/23' },
    { name: 'Arquitectura de Computadores - Proyecto 1', test: 'Puertas lógicas', group: 'Arquitectura de Computadores', deadline: '5/09/22'},
  ];

  const fakeTestData = [
    { name: 'Desarrollo Web Avanzado', count: 15},
    { name: 'Arquitectura de Computadores', count: 20},
    { name: 'Proyecto de Desarrollo de Software', count: 15},    
    { name: 'Desarrollo Web Avanzado', count: 15},
    { name: 'Arquitectura de Computadores', count: 20},
    { name: 'Proyecto de Desarrollo de Software', count: 15},    
    { name: 'Desarrollo Web Avanzado', count: 15},
    { name: 'Arquitectura de Computadores', count: 20},
    { name: 'Proyecto de Desarrollo de Software', count: 15},    
    { name: 'Desarrollo Web Avanzado', count: 15},
    { name: 'Arquitectura de Computadores', count: 20},
    { name: 'Proyecto de Desarrollo de Software', count: 15},
    { name: 'Desarrollo Web Avanzado', count: 15},
    { name: 'Arquitectura de Computadores', count: 20},
    { name: 'Proyecto de Desarrollo de Software', count: 15},
  ];

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
        />
        <AddUser 
          container={activeContainer} 
        />
      </div>
      )}

      {activeContainer==="groups" && (
      <div>
        <GroupsTable 
          data={fakeGroupData} 
          headers={tableHeaders[activeContainer]} 
        />
        <AddGroup 
          container={activeContainer} 
        />
      </div>
      )}

      {activeContainer==="evaluations" && (
      <div>
        <EvaluationTable 
          data={fakeEvaluationData} 
          headers={tableHeaders[activeContainer]} 
        />
        <AddEvaluation />
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
