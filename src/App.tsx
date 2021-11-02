import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Switch from "./components/Switch";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
//import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router} from "react-router-dom";



function App(): JSX.Element {

    //TODO #30: Home won't appear as the main page with the intro message and button to procede to the scheduler itself
    //so I need to work on a way to make this happen.
    return (
        <div className="App">

            <Router>

                <Header></Header>

                <Switch />
    
                <Footer></Footer>

            </Router>

        </div>
    );
}

export default App;
