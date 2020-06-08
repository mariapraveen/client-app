import React from 'react';
import User from './../User/User';
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
                        <User />
                    </Route>
                    <Route exact path="/:name">
                        <User />
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
