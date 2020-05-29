import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import User from './pages/User';
import Profile from './pages/Profile';
import Functionalities from './pages/Functionalities';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={User}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/functionalities" component={Functionalities}/>
            </Switch>
        </BrowserRouter>
    )
}