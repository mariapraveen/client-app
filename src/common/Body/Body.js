import React from 'react';
import Profile from './../Profile/Profile';
import NotFound from './../NotFound/NotFound';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class Body extends React.Component {

    render() {
        return (<div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Profile />
                    </Route>
                    <Route exact path="/:name">
                        <Profile />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>)
    }
}

export default Body;
