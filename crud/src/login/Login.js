import React, { useState } from 'react';

const Login = ({ toggleLoggedIn }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  const handleLogin = (event) => {
    event.preventDefault();

    // Check if inputs are not empty
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // handle successful authentication response
        const tokenAccess = data.access;
        const tokenRefresh = data.refresh;

        // store tokens in local storage
        localStorage.setItem('token_access', tokenAccess);
        localStorage.setItem('token_refresh', tokenRefresh);
        localStorage.setItem('username', username);

        // Update loggedIn state in the parent component
        toggleLoggedIn();
      })
      .catch((error) => {
        console.error('There was a problem with the authentication request:', error);
      });
  };

  return (
    <div className="h-[100vh]">
      <div className='mt-48'>
        <h1 className="text-5xl font-bold mb-6">Login</h1>
        <div className="mt-12">
          <form  className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="username" className="block font-bold mb-2 text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-2 border rounded"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2 text-white">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border rounded"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#1d232e] hover:bg-gray-900 text-white font-bold py-4 px-6 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
