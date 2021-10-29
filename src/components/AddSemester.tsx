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

    function yearChange(key: string | null): void {
        if (key !== null) {
            setYear(key);
        }        
    }

    function addSemester(): void {
        const semesterName: string = dropdownSeason + year;
        const newAllCourses: Record<string, Course[]> = {...allCourses};
        newAllCourses[semesterName] = [];
        setAllCourses(newAllCourses);
    }

    // Un-hardcode this later lol
    const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028"];

    return <Container className="m-3 p-3 border border-primary">
        <Row>
            <h3 className="addSemesterH3">Add Semester to Plan</h3>
        </Row>
        <Row>
            <Col className="text-end">
                <DropdownButton id="dropdown-season" title={dropdownSeason} onSelect={handleSeasonSelect}>
                    <Dropdown.Item eventKey="Fall">Fall</Dropdown.Item>
                    <Dropdown.Item eventKey="Winter">Winter</Dropdown.Item>
                    <Dropdown.Item eventKey="Spring">Spring</Dropdown.Item>
                    <Dropdown.Item eventKey="Summer">Summer</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col className="text-center">
                {/* <Form>
                    <Form.Group>
                        <Form.Control type="year" placeholder="year" onChange={yearChange}></Form.Control>
                    </Form.Group>
                </Form> */}
                <DropdownButton id="dropdown-year" title={year} onSelect={yearChange}>
                    {years.map((y: string) => {
                        return <Dropdown.Item key={y} eventKey={y}>{y}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </Col>
            <Col>
                <Button type="submit" onClick={addSemester}>Submit</Button>
            </Col>
        </Row>
    </Container>;
}