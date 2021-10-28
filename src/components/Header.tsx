import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../img/logo-udel.png";

export function Header(): JSX.Element {
    return(
        <Container>
            <Container className="udHeader">
                <Container className="udHeaderContainer">
                    <Container className="udHeaderWrapper">
                        <a href="https://www.udel.edu/" className="udHeaderLogo">
                            <img src={Logo} alt="University of Delaware" className="img-responsive"/>
                        </a>
                    </Container>
                </Container>
            </Container>

            <Container className="udHeader-collegeOuterWrapper">
                <Container className="udHeader-collegeBar">
                    <Container className="udHeader-collegeWrapper">
                        <Container className="udHeader-collegeName">
                            <a href="#"> UD CIS Scheduler</a>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}