import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import startFetch from './API';
import Waiting from './Waiting';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Waiting />
  </React.StrictMode>
);

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
      ReactDOM.render(
        <React.StrictMode>
          <App users={users} setUsers={setUsers} groups={groups} setGroups={setGroups} evaluations={evaluations} setEvaluations={setEvaluations} tests={tests} setTests={setTests}/>
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
  }, [users, groups, evaluations, tests]);

  return null;
};

root.render(<RootComponent />);