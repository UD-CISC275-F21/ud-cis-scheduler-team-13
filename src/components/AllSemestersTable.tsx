import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";

export function AllSemestersTable(): JSX.Element {

    return (<Container>
        <Row>
            <Col><SemesterTable></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable></SemesterTable></Col>
        </Row>                
    </Container>);
}