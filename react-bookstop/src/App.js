import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';

import Navbar from './components/NavBar';
import Home from './components/Home';
import EditForm from './components/EditForm';
import ReadBook from './components/ReadBook/ReadBook';

export const UserContext = createContext(); 

function App() {
  const [user, setUser] = useState(false);
  const userName = 'TEST-1';

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
      <Navbar/>
      <main>
        <Switch>
          <UserContext.Provider value={{
            user, 
            getUser
          }}>
            <Route
              exact
              path='/'
              component={Home}
            />
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
          </UserContext.Provider>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
