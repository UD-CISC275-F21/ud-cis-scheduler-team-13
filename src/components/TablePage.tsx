import React from "react";
import { Switch, Route } from "react-router-dom";

import { AllSemestersTable } from "./AllSemestersTable";
import App from "../App";

function Main(): JSX.Element {
    return(
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/scheduler" component={AllSemestersTable}></Route>
        </Switch>
    );
}

export default Main;