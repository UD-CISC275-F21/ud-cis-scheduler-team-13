import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
// import { SemesterTable } from "./components/SemesterTable";


function App(): JSX.Element {
    return (
        <div className="App">
            <div className="top-bar">

                
                <h1> UD CIS Scheduler</h1>
                
            </div>

            <p> Welcome! To start creating your schedule, click on the boxes below.</p>
        </div>
    );
}

export default App;
