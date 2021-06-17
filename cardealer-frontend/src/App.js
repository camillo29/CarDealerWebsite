import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './MainPage.js';
import NotFound from './NotFound.js';

function App(){
    return (
        <div>
            <Switch>
                <Route exact path = "/" component = {HomePage}/>
                <Route component = {NotFound} />
            </Switch>
        </div>
    );
}

export default App;
