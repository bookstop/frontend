import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 
import './App.css';

import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect, useContext, createContext, useReducer } from 'react';

import Navbar from './components/NavBar';
import SearchForm from './components/SearchForm';
import RegisterForm from './components/RegisterForm';
import ReadBooks from './components/ReadBooks';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Header from './components/Header'
import EditForm from './components/EditForm';
import ReadBook from './components/ReadBook/ReadBook';
import WishBook from './components/WishBook/WishBook';

// Declare three global useContext contexts to pass state and dispatch context to lower components
export const UserContext = React.createContext(); 
export const UserAuthStatusContext = React.createContext();
export const UserAuthDispatchContext = React.createContext(); 

function App() {
  
  const [user, setUser] = useState(false);
  let location = useLocation();
  
  /*====================================================
    Login and user session related components
  =====================================================*/

  // To initialize the user authentication status
  const initialUserAuth = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    status: '',
    lastAccess: '',
  }

  // This useReducer hooks calls local functions to handle the requested actions
  function userReducer(state, action) {

    switch (action.type) {
      case 'Login':
        return action.login;
      case 'Logout':
        return action.login;
      case 'Status':
        return action.login;   
      default:
        return userAuth;
    }
  }

  // This defines the initial user authentication object and the user auth reducer
  const [userAuth, dispatch] = useReducer(userReducer, initialUserAuth);

  // api call for users & logic to check if user is logged in
  const getUser = async () => {

    // Check to see if the user is already logged in with a valid session
    // Sessions are valid for 30 minutes since the user's last interaction with the site
    if ( (userAuth) && (userAuth._id) && (userAuth.status==='active') && ( (Date.now()-userAuth.lastAccess)<900) ) {
        return;
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
      
      setUser(data);

      const userAuthUpdate = { _id: data._id, 
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        status: data.status,
        lastAccess: Date.now(),
      }
      localStorage.setItem('BookStopUser', data._id );
      dispatch( {"type": "Login", "login": userAuthUpdate});

    } catch (err) {
      console.log(err)
    }
  };

  // Get the logged in user when this page mounts or reloads
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  // This function simple calls the backend API and updates the user's lastaccess time in seconds since the epoch
  // We do this so we know when the user is inactive, in which case we consider them logged off.

  const _userSessionKeepAlive = async () => {
    const API_ENDPOINT = `http://localhost:4000/users/status:${userAuth._id}`;
    //console.log(values)
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'PUT',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        if (response.status === 200) {
          const data = await response.json();  
          const userAuthUpdate = { _id: data._id, 
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            status: data.status,
            lastAccess: Date.now(),
          }
          localStorage.setItem('BookStopUser', data._id );
          dispatch( {"type": "Login", "login": userAuthUpdate});        
        }
        else {
          console.log(`Something went wrong with updating the user's session.`);
        }
    } catch (error) {
        console.error(`Something went wrong with updating the user's session.`);
        console.error(error)
    }
}

  // Whenever there is a change in location we assume the user is continuing their session, so we will update
  // their lastAccess value in the database, if they are a logged in user.
  useEffect ( () => {
    if ( (userAuth) && (userAuth._id) && (userAuth.status==='active') ) { 
      _userSessionKeepAlive();
    }
     // eslint-disable-next-line
  }, [location] );


  return (

    <BrowserRouter>
    <UserAuthStatusContext.Provider value={userAuth}>
      <UserAuthDispatchContext.Provider value={dispatch}>   
        <UserContext.Provider value={{
              user, 
              getUser
        }}>

      <Navbar value={userAuth._id}/>
      <Header/>
      
      
      <main>
        <Switch>

            <Route  
              path='/read-books/edit/:bookId'
              render={(routerProps) => (
                <EditForm match={routerProps.match} />
                )}
            />
            <Route
              path='/read-books/:bookId'
              component={ReadBook}
            />
            <Route
              path='/wish-book/:bookId'
              component={WishBook}
            />
                
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
            <Route
              path='/'
              component={Home}
            />  

        </Switch>
        <SearchForm/>
        
      </main>

        </UserContext.Provider>
       </UserAuthDispatchContext.Provider>
      </UserAuthStatusContext.Provider>
      </BrowserRouter>


  );
}

// This function stores a file log into local storage in a web storage variable called BookStop.log
// This provides some unique debugging opportunities to trace events and refreshes when the Web console log
// may be clearing on the browser.

function storage_log(logValue) {

  const previousValue = localStorage.getItem("BookStop.log");

  if (typeof logValue==='object') {
    const logValueJSON = JSON.stringify(logValue);
    localStorage.setItem("BookStop.log", `${previousValue}\n${typeof logValue}\n${logValue}\n${logValueJSON}`);
  }
  else {
    localStorage.setItem("BookStop.log", `${previousValue}\n${typeof logValue}\n${logValue}\n`);
  }

}

export default App;
