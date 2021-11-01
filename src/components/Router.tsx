import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Scheduler from "./ShowTables";
import Home from "./Home";
//import { AllSemestersTable } from "./AllSemestersTable";

function Redirect(): JSX.Element {
    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/scheduler">
                        <Scheduler />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Redirect;