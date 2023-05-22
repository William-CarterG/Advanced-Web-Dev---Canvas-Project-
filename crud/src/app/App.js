import React, { useState, useEffect } from 'react';
import './main.css';
import Users from './components/Users';
import Groups from './components/Groups';

function handleEvaluationsButtonClick() {
  // Navigate to the Evaluations CRUD page
  console.log("Evaluations CRUD clicked.");
}

function handleTestsButtonClick() {
  // Navigate to the Tests CRUD page
  console.log("Tests CRUD clicked.");
}

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
  const [activeContainer, setActiveContainer] = useState(null);

  useEffect(() => {
    // Function to handle button click and add the 'pressed' class.
    function handleClick(event) {
      unpressedButtons(); // Remove 'pressed' class from all buttons.
      const button = event.target;
      buttonPressed(button);
    }

    // Attach click event listeners to the buttons.
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      button.addEventListener('click', handleClick);
    });

    // Clean up the event listeners when the component unmounts.
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  // Columns names desired for each table. Remember to modify CSS table when adding/deleting columns.
  const tableHeaders = {
    users: ['Name', 'Email', 'Role'],
    groups: ['Group Name', 'Creator', 'Average Grade'],
  };

  // Fill table with it's corresponding data.
  const renderTableRows = () => {
    if (activeContainer === 'users') {
      // Return table rows for users container.
      return fakeData.map((item, index) => (
        <tr key={index}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.role}</td>
        </tr>
      ));
    } else if (activeContainer === 'groups') {
      // Return table rows for groups container.
      return <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
    } else {
      return null;
    }
  };

  // Fake data to fill user's table.
  const fakeData = [
    { name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
    { name: 'Michael Johnson', email: 'michaeljohnson@example.com', role: 'Admin' },
    { name: 'Emily Davis', email: 'emilydavis@example.com', role: 'Evaluador' },
    { name: 'Daniel Wilson', email: 'danielwilson@example.com', role: 'Visualizador' },
    { name: 'Olivia Brown', email: 'oliviabrown@example.com', role: 'Admin' },
    { name: 'William Taylor', email: 'williamtaylor@example.com', role: 'User' },
    { name: 'Sophia Martinez', email: 'sophiamartinez@example.com', role: 'Evaluador' },
    { name: 'Joseph Anderson', email: 'josephanderson@example.com', role: 'Visualizador' },
    { name: 'Abigail Thomas', email: 'abigailthomas@example.com', role: 'Admin' },
    { name: 'James White', email: 'jameswhite@example.com', role: 'User' },
    { name: 'Mia Garcia', email: 'miagarcia@example.com', role: 'Evaluador' },
    { name: 'Alexander Rodriguez', email: 'alexanderrodriguez@example.com', role: 'Visualizador' },
    { name: 'Charlotte Lee', email: 'charlottelee@example.com', role: 'Admin' },
    { name: 'David Clark', email: 'davidclark@example.com', role: 'User' },
    { name: 'Sofia Lewis', email: 'sofialewis@example.com', role: 'Evaluador' },
    { name: 'Benjamin Walker', email: 'benjaminwalker@example.com', role: 'Visualizador' },
    { name: 'Ava Hall', email: 'avahall@example.com', role: 'Admin' },
    { name: 'Logan Young', email: 'loganyoung@example.com', role: 'User' },
    { name: 'Chloe Hernandez', email: 'chloehernandez@example.com', role: 'Evaluador' },
    { name: 'Elijah King', email: 'elijahking@example.com', role: 'Visualizador' },
    { name: 'Lily Green', email: 'lilygreen@example.com', role: 'Admin' },
    { name: 'Christopher Martinez', email: 'christophermartinez@example.com', role: 'User' },
    { name: 'Grace Turner', email: 'graceturner@example.com', role: 'Evaluador' },
    { name: 'Daniel Thompson', email: 'danielthompson@example.com', role: 'Visualizador' },
    { name: 'Avery Scott', email: 'averyscott@example.com', role: 'Admin' },
    { name: 'Victoria Phillips', email: 'victoriaphillips@example.com', role: 'User' },
    { name: 'Jackson Baker', email: 'jacksonbaker@example.com', role: 'Evaluador' },
    { name: 'Scarlett Adams', email: 'scarlettadams@example.com', role: 'Visualizador' },
    { name: 'Anthony Wright', email: 'anthonywright@example.com', role: 'Admin' },
    // Add more fake data
  ];

  return (
    <>
      <h1>Welcome to the Administration Panel</h1>
      <Users onClick={() => setActiveContainer('users')}/>
      <Groups onClick={() => setActiveContainer('groups')} />
      <button className="button" onClick={handleEvaluationsButtonClick}>
        Manage Evaluations
      </button>
      <button className="button" onClick={handleTestsButtonClick}>
        Manage Tests
      </button>

      {/* When 'Manage Users' button is clicked, it displays the user information. Currently, it doesn't hide it after */}
      {activeContainer && (
        <div className="container">
          {/* TODO: Add search bar to make the users more accessible. */}
          <table className="table">
            <thead>
              <tr>
                {tableHeaders[activeContainer].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default App;
