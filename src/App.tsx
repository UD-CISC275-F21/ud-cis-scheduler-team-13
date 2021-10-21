import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import {Container, Row, Col} from "react-bootstrap";
import { SemesterTable } from "./components/SemesterTable";


function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                    Dennis Mirza
                </p>
                <p>
                    Tim Longoria
                </p>
                <p> Sebastian Cortes</p>
            </header>
                    
            {/* <Container>
                <Row>
                    <Col>Bootstrap column</Col>
                </Row>
            </Container>     */}
            <SemesterTable></SemesterTable>
        </div>
    );
}

export default App;
