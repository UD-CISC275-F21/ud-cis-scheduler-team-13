import React from "react";
import { Container } from "react-bootstrap";

export function Header(): JSX.Element {
    return(
        <Container className="udHeader">
            <Container className="udHeaderContainer">
                <Container className="udHeaderWrapper">
                    <a href="https://www.udel.edu/" className="udHeaderLogo">
                        <img src="../assets/logo-udel.png" alt="University of Delaware" className="img-responsive"/>
                    </a>
                </Container>
            </Container>
        </Container>
    );
}