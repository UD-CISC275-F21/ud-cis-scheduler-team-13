import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Router from "./components/Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { Container, Button } from "react-bootstrap";



function App(): JSX.Element {

    //TODO #30: Home won't appear as the main page with the intro message and button to procede to the scheduler itself
    //so I need to work on a way to make this happen.
    return (
        <div className="App"> 

            <Header></Header>

            <div className="Content">
                <Router />
            </div>
 
            <Footer></Footer>

        </div>
    );
}

export default App;
