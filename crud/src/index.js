import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import startFetch from './API';
import Waiting from './Waiting';
import Login from './login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootComponent = () => {
  const [groups, setGroups] = useState(null);
  const [evaluations, setEvaluations] = useState(null);
  const [users, setUsers] = useState(null);
  const [tests, setTests] = useState(null);

  useEffect(() => {
    startFetch(`courses/`, 'GET', null, function(data) {
      setGroups(data);
    });

    startFetch(`evaluations/`, 'GET', null, function(data) {
      setEvaluations(data);
    });

    startFetch(`users/`, 'GET', null, function(data) {
      setUsers(data);
    });

    startFetch(`tests/`, 'GET', null, function(data) {
      setTests(data);
    });
  }, []);

  useEffect(() => {
    if (users && groups && evaluations && tests) {
      root.render(
        <React.StrictMode>
          <App users={users} setUsers={setUsers} groups={groups} setGroups={setGroups} evaluations={evaluations} setEvaluations={setEvaluations} tests={tests} setTests={setTests}/>
        </React.StrictMode>
      );
    }
  }, [users, groups, evaluations, tests]);

  return (
    <Waiting />
  );
};

function Index() {
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  useEffect(() => {
    if (loggedIn) {
      root.render(
        <React.StrictMode>
          <RootComponent />
        </React.StrictMode>
      );
    }
  }, [loggedIn]);

  return (
    <React.StrictMode>
      {loggedIn ? <RootComponent /> : <Login toggleLoggedIn={toggleLoggedIn} />}
    </React.StrictMode>
  );
}

root.render(
  <React.StrictMode>
    <Index />,
  </React.StrictMode>
);
