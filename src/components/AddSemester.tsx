import { useState } from "react";
import React, { Container, Row, Dropdown, DropdownButton, Form, Col, Button } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export function AddSemester({allCourses, setAllCourses}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const [dropdownSeason, setDropdownSeason] = useState<string>("Fall");
    const [year, setYear] = useState<string>("2022");

    function handleSeasonSelect(key: string | null): void {
        if (key !== null) {
            setDropdownSeason(key);
        }
    }

    function yearChange(): void {
        setYear(year);
    }

    function addSemester(): void {
        const semesterName: string = dropdownSeason + year;
        const newAllCourses: Record<string, Course[]> = {...allCourses};
        newAllCourses[semesterName] = [];
        setAllCourses(newAllCourses);
    }

    return <Container className="m-3 p-3 border border-primary">
        <Row>
            <h3 className="addSemesterH3">Add Semester to Plan</h3>
        </Row>
        <Row>
            <Col>
                <DropdownButton id="dropdown-season" title={dropdownSeason} onSelect={handleSeasonSelect}>
                    <Dropdown.Item eventKey="Fall">Fall</Dropdown.Item>
                    <Dropdown.Item eventKey="Winter">Winter</Dropdown.Item>
                    <Dropdown.Item eventKey="Spring">Spring</Dropdown.Item>
                    <Dropdown.Item eventKey="Summer">Summer</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Control type="year" placeholder="year" onChange={yearChange}></Form.Control>
                    </Form.Group>
                </Form>
            </Col>
            <Col>
                <Button type="submit" onClick={addSemester}>Submit</Button>
            </Col>
        </Row>
    </Container>;
}