import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';

function App() {
  // main api call

  return (
    <BrowserRouter>
      <nav>

      </nav>
      <main>
        <Switch>
          <Route
            path='/'
            render={() => <Home />}
          />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
