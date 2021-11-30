import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import { AllSemestersTable } from "./AllSemestersTable";


function Redirect(): JSX.Element {
    return(
        <Switch>
            <Route exact path="/ud-cis-scheduler-team-13/" component={Home} />
            <Route path="/ud-cis-scheduler-team-13/scheduler" component={AllSemestersTable} />
        </Switch>
    );
}

export default Redirect;