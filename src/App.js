import React from 'react';
import './App.css';
import Register from './register';
import Home from './home';
import Login from './login';
import Coordinator from './coordinator';
import CoordinatorHome from './coordinator';
import Admin from './admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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

export default App;
