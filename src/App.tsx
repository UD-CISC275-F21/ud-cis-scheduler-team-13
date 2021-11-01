import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Router from "./components/Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { Container, Button } from "react-bootstrap";



function App(): JSX.Element {
    return (
        <div className="App"> 

            <Header></Header>
 
            <Router /> 

            <Footer></Footer>

        </div>
    );
}

export default App;
