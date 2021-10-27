import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function Header(): JSX.Element {
    return(
        <Container>
            <Row>
                <Col>
                    Logo goes here.
                </Col>
                <Col>
                    UD CIS Scheduler
                </Col>
            </Row>
        </Container>
    );
}