import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { useState } from "react";

export function AllSemestersTable(): JSX.Element {
    const courses: Course[] = [
        {id: "CISC275", name: "Introduction to Software Engineering", description: "Description 1", prereqs: ["CISC220"]},
        {id: "CISC181", name: "Introduction to Computer Science II", description: "Description 2", prereqs: ["CISC108"]},
        {id: "CISC210", name: "Introduction to Systems Programming", description: "Description 3", prereqs: ["CISC108"]}];

    const courses1: Course[] = [
        {id: "CISC108", name: "Introduction to Computer Science I", description: "Description 1", prereqs: []},
        {id: "CISC220", name: "Data Structures", description: "Description 2", prereqs: ["CISC210"]},
        {id: "CISC260", name: "Machine Organization and Assembly Language", description: "Description 3", prereqs: ["CISC210"]}];

    // Take list of courses and sort them into default semesters,
    // or maybe leave semesters blank by default
    const defaultCourses: Record<string, Course[]> = {
        "Fall": courses1,
        "Spring": courses1,
        "Summer": courses,
        "Winter": courses,
        "Remaining": []};

    // Hook to track courses across semesters
    // Pass this into SemesterTable
    const [allCourses, setAllCourses] = useState<Record<string, Course[]>>(defaultCourses);

    return <Container>
        <Row>
            <Col><SemesterTable semesterName="Fall" creditLimit={21} allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable></Col>
            <Col><SemesterTable semesterName="Spring" creditLimit={21} allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable></Col>
        </Row>
        <Row>
            <Col><SemesterTable semesterName="Summer" creditLimit={7} allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable></Col>
            <Col><SemesterTable semesterName="Winter" creditLimit={7} allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable></Col>
        </Row>                
    </Container>;
}