import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { AllSemestersTable } from "./components/AllSemestersTable";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";


function App(): JSX.Element {
    return (
        <div className="App">

            <Header></Header>
            
            <AllSemestersTable></AllSemestersTable>

            <Footer></Footer>

        </div>
    );
}

export default App;
