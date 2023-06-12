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
  const [group, setGroup] = useState(null);

  useEffect(() => {
    startFetch(`courses/`, 'GET', null, function(data) {
      console.log(data);
      setGroup(data);
    });
  }, []);

  useEffect(() => {
    if (group) {
      root.render(
        <React.StrictMode>
          <App group={group} />
        </React.StrictMode>
      );
    }
  }, [group]);

  return null;
};

root.render(<RootComponent />);