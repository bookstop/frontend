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
import Logout from './components/Logout';

// Declare three global useContext contexts yo pass state and dispatch context to lower components
export const UserContext = React.createContext(); 
export const UserAuthStateContext = React.createContext();
export const UserAuthDispatchContext = React.createContext();

function App() {
  
  const [user, setUser] = useState(false);

  /*====================================================
    Login and user session related components
  =====================================================*/

  // To initialize the user authentication state
  const initialUserAuth = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    state: '',
    lastAccess: '',
  }

  // This useReducer hooks calls local functions to handle the requested actions
  function userReducer(state, action) {
    console.log("Action follows in reducer:");
    console.log(action);
    switch (action.type) {
      case 'Login':
        return action.login;
      case 'Logout':
        return action.login;
      case 'Status':
        return action.login;   
      default:
        console.log("A uncaught login error was encountered.");
    }
  }

  // This defines the initial user authentication object and the user auth reducer
  const [userAuth, dispatch] = useReducer(userReducer, initialUserAuth);

  // api call for users & logic to check if user is logged in
  const getUser = async () => {

    // Check to see if the user is already logged in with a valid session
    // Sessions are valid for 30 minutes since the user's last interaction with the site
    if ( (userAuth) && (userAuth._id) ) {
      if ( (userAuth.status==='active') && ( (Date.now()-userAuth.lastAccess)<1800) ) {
        return;
      }
    }

    // The user doesn't appear to have an active session in memory.  We can check to see
    // if we have stored their BookStop userid in local Web browser key/value storage
    const userID = localStorage.getItem('BookStopUser');
    if (userID===null) {
      return;  // If null no stored userID was found.  We don't know who this user is.
    }

    // If we made it this far, we have a userID and  can query the database to get the user's 
    // information and see if they are a valid user with a valid active session.  Even if they 
    // are a recognized "active" user, we won't give them access unless they have signed in 
    // recently and browsed the site, which is tracked by the lastAccess value.
    try {
      const API_ENDPOINT = `http://localhost:4000/users/${userID}`;
      const response = await fetch (API_ENDPOINT);
      const data = await response.json();
      console.log("Data follows:")
      console.log(data);

      setUser(data);

      const userAuthUpdate = { _id: data._id, 
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        status: data.status,
        lastAccess: Date.now(),
      }
      localStorage.setItem('BookStopUser', data._id );
      userReducer(userAuth, {"type": "Login", "login": userAuthUpdate});
    
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
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
              path='/login'
              component={LoginForm}
            />            
            <Route
              path='/logout'
              component={Logout}
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
