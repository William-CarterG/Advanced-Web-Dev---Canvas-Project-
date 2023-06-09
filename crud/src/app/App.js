import React, { useState, useEffect } from 'react';
import './main.css';
import Users from './components/users/Users';
import Groups from './components/groups/Groups';
import Evaluations from './components/Evaluations';
import Tests from './components/Tests';
import AddUser from './components/users/addUser';
import UserTableComponent from './components/users/UserTableComponent';


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
    users: ['Name', 'Roles'],
    groups: ['Group Name', 'Members'],
    evaluations: ['Evaluation Name', 'Status', 'Submission Deadline'],
    tests: ['Name', 'N° of Questions', 'Creator']
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

  return (
    <>
      <h1  className='text-center'>Welcome to the Administration Panel</h1>
    
      <div className="mt-6 mb-8 md:flex md:items-center relative">  
        {/* Search bar */}
        <div className="flex items-center">
            <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>
            <input type="text" placeholder="Search" 
            className="block w-full py-1.5 pr-5 text-gray-700 
            bg-white border border-gray-200 rounded-lg md:w-80 
            placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 
            dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 
            focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 
            focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
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
        <UserTableComponent 
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
        <UserTableComponent 
          data={fakeUserData} 
          headers={tableHeaders[activeContainer]} 
        />
        <AddUser 
          container={activeContainer} 
        />
      </div>
      )}


    </>
  );
}

export default App;
