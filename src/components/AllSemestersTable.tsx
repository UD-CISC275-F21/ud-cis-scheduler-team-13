import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export function AllSemestersTable(): JSX.Element {
    const courses: Course[] = [
        {id: "CISC275", name: "Introduction to Software Engineering", description: "Description 1", prereqs: ["CISC220"]},
        {id: "CISC181", name: "Introduction to Computer Science II", description: "Description 2", prereqs: ["CISC108"]},
        {id: "CISC210", name: "Introduction to Systems Programming", description: "Description 3", prereqs: ["CISC108"]}];

    return <Container>
        <Row>
            <Col><SemesterTable semesterName='Fall' courses={courses}></SemesterTable></Col>
            <Col><SemesterTable semesterName='Spring' courses={courses}></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable semesterName='Summer' courses={courses}></SemesterTable></Col>
            <Col><SemesterTable semesterName='Winter' courses={courses}></SemesterTable></Col>
        </Row>                
    </Container>;
}