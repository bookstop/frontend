import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 
import Navbar from './components/NavBar';
import SearchForm from './components/SearchForm';
import RegisterForm from './components/RegisterForm';
import ReadBooks from './components/ReadBooks';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect, useContext, useReducer } from 'react';
import Home from './components/Home';
import LoginForm from './components/LoginForm';

export const UserContext = React.createContext(); 

// Declare two global useContext contexts yo pass state and dispatch context to lower components
export const UserAuthStateContext = React.createContext();
export const UserAuthDispatchContext = React.createContext();

function App() {
  const [user, setUser] = useState(false);
  const userName = 'Test 1-1';
  
  /*====================================================
    Login and user session related components
  =====================================================*/

  // To initialize the user authentication state
  const initialUserAuth = {
    _id: '',
    state: '',
    lastAccess: '',
  }

  // This useReducer hooks calls local functions to handle the requested actions
  function userReducer(state, action) {
    switch (action.type) {
      case 'Login':
        return {
          _id: "1",
          state: "2",
          lastAccess: "3",
        };
      case 'Logout':
        return {
          _id: '',
          state: '',
          lastAccess: '',      
        };
      case 'Update Status':
        return {
          _id: 'u1',
          state: 'u2',
          lastAccess: 'u3',      
        };        
      default:
        throw new Error();
    }
  }

  // This defines the initial user authentication object and the user auth reducer
  const [userAuth, dispatch] = useReducer(userReducer, initialUserAuth);

  // api call for users & logic to check if user is logged in
  const getUser = async () => {
    try {
      const API_ENDPOINT = 'http://localhost:4000/users';
      const response = await fetch (API_ENDPOINT);
      const data = await response.json();
      const currentUser  = data.find((user) => {
        return user.username === userName;
      })
      setUser(currentUser);
      console.log(currentUser);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (

  <BrowserRouter>
    <UserAuthStateContext.Provider value={userAuth}>
      <UserAuthDispatchContext.Provider value={dispatch}>   

      <Navbar/>
      <SearchForm/>
      <main>
        <Switch>
          <UserContext.Provider value={{
            user, 
            getUser
          }}>
            <Route
              path='/register'
              component={RegisterForm}
            />
            <Route
              path='/home'
              component={Home}
            />
          </UserContext.Provider>
        </Switch>
      </main>

       </UserAuthDispatchContext.Provider>
      </UserAuthStateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
