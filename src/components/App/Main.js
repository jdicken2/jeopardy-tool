import {
    Switch,
    Route
} from 'react-router-dom';
import React from 'react';

import Home from 'Pages/Home';
import Create from 'Pages/Create';

export default function Main() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/create">
                <Create />
            </Route>
            {/* <Route path="/board">
                <Board />
            </Route> */}
        </Switch>
    );
}
