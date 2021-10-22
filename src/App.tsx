import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { AllSemestersTable } from "./components/AllSemestersTable";


function App(): JSX.Element {
    return (
        <div className="App">
<<<<<<< HEAD
            <div className="top-bar">

                
                <h1> UD CIS Scheduler</h1>
                
            </div>

            <p> Welcome! To start creating your schedule, click on the boxes below.</p>
=======
            <AllSemestersTable></AllSemestersTable>
            UD CIS Scheduler
>>>>>>> b714d022bd3e03a5ffda4c2924b013d7180cd50e
        </div>
    );
}

export default App;
