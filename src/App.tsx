import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { AllSemestersTable } from "./components/AllSemestersTable";


function App(): JSX.Element {
    return (
        <div className="App">
            <AllSemestersTable></AllSemestersTable>
            UD CIS Scheduler
        </div>
    );
}

export default App;
