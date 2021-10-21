import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";

export function AllSemestersTable(): JSX.Element {

    return <Container>
        <Row>
            <Col><SemesterTable semesterName='Fall'></SemesterTable></Col>
            <Col><SemesterTable semesterName='Spring'></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable semesterName='Summer'></SemesterTable></Col>
            <Col><SemesterTable semesterName='Winter'></SemesterTable></Col>
        </Row>                
    </Container>;
}