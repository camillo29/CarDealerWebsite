import React, {useState} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MainPage from './MainPage.js';
import NotFound from './NotFound.js';
export const AppContext = React.createContext();
function App(){
    const [accountDetails, setAccountDetails] = useState('');
    return (
        <AppContext.Provider value = {{accountDetails, setAccountDetails}}>
        <div>
            <Switch>
                    <Route exact path = "/" component = {MainPage}/>
                <Route component = {NotFound} />
            </Switch>
        </div>
        </AppContext.Provider>
    );
}

export default App;
