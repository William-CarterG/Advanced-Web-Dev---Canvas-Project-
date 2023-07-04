import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import './main.css';
import '../App.css';
import startFetch from '../API';

import Users from './components/users/button/Users';
import AddUser from './components/users/crud/addUser';
import UsersTable from './components/users/UsersTable';

import Groups from './components/groups/button/Groups';
import GroupsTable from './components/groups/GroupsTable'
import AddGroup from './components/groups/crud/addGroup';

import Evaluations from './components/evaluations/button/Evaluations';
import EvaluationTable from './components/evaluations/EvaluationsTable';
import AddEvaluation from './components/evaluations/crud/addEvaluation';

import Tests from './components/tests/nav-button/Tests';
import TestsTable from './components/tests/TestsTable';
import AddTest from './components/tests/tests-crud/addTest';

function App({ users, setUsers, groups, setGroups, evaluations, setEvaluations, tests, setTests }) {
  const [userRoles, setUserRoles] = useState([]);
  const [activeContainer, setActiveContainer] = useState('users');

  useEffect(() => {
    startFetch(`/users/?search=${localStorage.getItem('username')}`, 'GET', null, function (data) {
      setUserRoles(data[0].groups);
    });
  }, []);

  const handleContainerChange = (container) => {
    setActiveContainer(container);
  };

  const tableHeaders = {
    users: ['Nombre Completo', 'Roles'],
    groups: ['Nombre de Grupo', 'N° de Miembros'],
    evaluations: ['Nombre de evaluacion', 'Fecha de Creacion', 'Fecha Limite'],
    tests: ['Nombre', 'N° de Preguntas']
  };

  const userData = users;
  const groupData = groups;
  const evaluationData = evaluations;
  const testData = tests;

  return (
    <>
      <div className='justify-center text-center h-full pb-6 flex pr-20'>Panel de Administracion
        <h1 className='justify-center text-center pt-4'>Panel de Administracion</h1>
        <div className="flex items-center">
          <img src={logo} alt="logo" className="App-logo w-28 mb-5" />
        </div>
      </div>

      <div className="md:flex md:items-center relative">
        <div className="inline-flex absolute left-1/2 transform -translate-x-1/2">
          {userRoles.includes("admin") && (
            <Users onClick={() => handleContainerChange('users')} active={activeContainer === 'users'}/>
          )}
          {userRoles.includes("evaluator") && (
            <div>
              <Groups onClick={() => handleContainerChange('groups')} active={activeContainer === 'groups'} />
              <Evaluations onClick={() => handleContainerChange('evaluations')} active={activeContainer === 'evaluations'} />
              <Tests onClick={() => handleContainerChange('tests')} active={activeContainer === 'tests'} />
            </div>
          )}
        </div>
      </div>

      {activeContainer === "users" && (
        <div>
          <UsersTable
            data={userData}
            headers={tableHeaders[activeContainer]}
            setUsers={setUsers}
          />
          <AddUser
            container={activeContainer}
            setUsers={setUsers}
          />
        </div>
      )}

      {activeContainer === "groups" && (
        <div>
          <GroupsTable
            data={groupData}
            headers={tableHeaders[activeContainer]}
            setGroups={setGroups}
          />
          <AddGroup
            container={activeContainer} setGroups={setGroups}
          />
        </div>
      )}

      {activeContainer === "evaluations" && (
        <div>
          <EvaluationTable
            data={evaluationData}
            headers={tableHeaders[activeContainer]}
            setEvaluations={setEvaluations}
          />
          <AddEvaluation setEvaluations={setEvaluations} groups={groups} tests={tests} />
        </div>
      )}

      {activeContainer === "tests" && (
        <div>
          <TestsTable
            data={testData}
            headers={tableHeaders[activeContainer]}
            setTests={setTests}
          />
          <AddTest
            container={activeContainer}
            setTests={setTests}
          />
        </div>
      )}
    </>
  );
}

export default App;
