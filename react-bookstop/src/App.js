import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 
import Navbar from './components/NavBar';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';


function App() {
  const [users, setUsers] = useState([]);
  
  // api call for users & logic to check if user is logged in
  const getUsers = async () => {
    try {
      const API_ENDPOINT = 'http://localhost:4000/users';
      const response = await fetch (API_ENDPOINT);
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (

    <BrowserRouter>
      <Navbar/>
      <main>
        <Switch>
          <Route
            path='/'
            render={() => <Home getUsers={getUsers} users={users} />}
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
