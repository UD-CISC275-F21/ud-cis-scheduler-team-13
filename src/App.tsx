import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import Main from "./components/TablePage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function App(): JSX.Element {
    return (
        <div className="App"> 

            <Header></Header>  

            <Container className="Welcome-message">
                <div>
                    <h1> Welcome to the UD CIS Scheduler!</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique saepe ipsum recusandae deleniti eos hic illo, eveniet, 
                        debitis consectetur dolorum adipisci delectus? Necessitatibus modi culpa quibusdam est dicta magnam nisi. 
                    </p>
                    <br />
                    <p>
                        To Continue to the Scheduler, press the button below.
                    </p>
                    <div className="initial-schedule">
                        <Link to="/scheduler">
                            <Button>Create New Schedule</Button>
                        </Link>
                    </div>
                </div>

            </Container>

            <Main /> 

            <Footer></Footer>

        </div>
    );
}

export default App;
