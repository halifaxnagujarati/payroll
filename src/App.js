import React from 'react';
import './App.css';
import Register from './register'; // Assuming your Register component is named 'Register' and in the same folder
import Home from './home'; // Replace with your actual Home component
import Login from './login'; // Replace with your actual Login component
import Coordinator from './coordinator'; // Replace with your actual Coordinator component
import CoordinatorHome from './coordinatorHome'; // Replace with your actual CoordinatorHome component
import Admin from './admin'; // Replace with your actual Admin component
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// App component definition
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/coordinator">
            <Coordinator />
          </Route>
          <Route path="/coordinator-home">
            <CoordinatorHome />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

// Exporting the App component
export default App;
