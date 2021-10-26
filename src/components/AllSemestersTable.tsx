import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export function AllSemestersTable(): JSX.Element {
    const courses: Course[] = [
        {id: "CISC275", name: "Introduction to Software Engineering", description: "Description 1", prereqs: ["CISC220"]},
        {id: "CISC181", name: "Introduction to Computer Science II", description: "Description 2", prereqs: ["CISC108"]},
        {id: "CISC210", name: "Introduction to Systems Programming", description: "Description 3", prereqs: ["CISC108"]}];

    const courses1: Course[] = [
        {id: "CISC108", name: "Introduction to Computer Science I", description: "Description 1", prereqs: []},
        {id: "CISC220", name: "Data Structures", description: "Description 2", prereqs: ["CISC210"]},
        {id: "CISC260", name: "Machine Organization and Assembly Language", description: "Description 3", prereqs: ["CISC210"]}];

    return <Container>
        <Row>
            <Col><SemesterTable semesterName='Fall' creditLimit={21} courses={courses1}></SemesterTable></Col>
            <Col><SemesterTable semesterName='Spring' creditLimit={21} courses={courses1}></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable semesterName='Summer' creditLimit={7} courses={courses}></SemesterTable></Col>
            <Col><SemesterTable semesterName='Winter' creditLimit={7} courses={courses}></SemesterTable></Col>
        </Row>                
    </Container>;
}