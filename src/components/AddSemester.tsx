import { useState } from "react";
import React, { Container, Row, Dropdown, DropdownButton, Button, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";

export function AddSemester({allCourses, setAllCourses}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const [dropdownSeason, setDropdownSeason] = useState<string>("Fall");
    const [year, setYear] = useState<string>("2022");
    const [sameSemWarn, setSameSemWarn] = useState<boolean>(false);

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
        const semesterName: string = dropdownSeason + year.toString();
        const newAllCourses: Record<string, Course[]> = {...allCourses};

        setSameSemWarn(false);

        // Check if semester already exists
        if (semesterName in allCourses) {
            // Semester already exists, don't add and tell user
            setSameSemWarn(true);
            return;
        }

        newAllCourses[semesterName] = [];
        setAllCourses(newAllCourses);
    }

    // Make a string array of years around the current year
    function makeYears(): string[] {
        const currYear = 2021;
        const years: string[] = [];
        for (let i = 0; i < 12; i++) {
            years.push((currYear - 3 + i).toString() as string);
        }
        return years;
    }

    const years = makeYears();

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
                <DropdownButton id="dropdown-year" title={year} onSelect={yearChange}>
                    {years.map((y: string) => {
                        return <Dropdown.Item key={y} eventKey={y}>{y}</Dropdown.Item>;
                    })}
                </DropdownButton>
                {sameSemWarn && <p className="Warning">
                    That semester is already in the plan
                </p>}
            </Col>
            <Col>
                <Button type="submit" onClick={addSemester}>Submit</Button>
            </Col>
        </Row>
    </Container>;
}