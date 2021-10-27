import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { AllSemestersTable } from "./components/AllSemestersTable";
import { Header } from "./components/Header";


function App(): JSX.Element {
    return (
        <div className="App">

            <Header></Header>
            <AllSemestersTable></AllSemestersTable>

        </div>
    );
}

export default App;
