import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Switch from "./components/Switch";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router} from "react-router-dom";



function App(): JSX.Element {

    return (
        <div className="App">

            <Router>

                <Header></Header>

                <div className="Contents">
                
                    <Switch />

                </div>
    
                <Footer></Footer>

            </Router>

        </div>
    );
}

export default App;
