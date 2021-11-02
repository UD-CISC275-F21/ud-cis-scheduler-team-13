import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Scheduler from "./ShowTables";
import Home from "./Home";
//import { AllSemestersTable } from "./AllSemestersTable";

function Redirect(): JSX.Element {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/scheduler" component={Scheduler} />
        </Switch>
    );
}

export default Redirect;