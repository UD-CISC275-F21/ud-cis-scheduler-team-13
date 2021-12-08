import { useState, ChangeEvent } from "react";
import React, { Container, Row, Dropdown, DropdownButton, Button, Col, Form } from "react-bootstrap";
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

    function yearChangeDropdown(key: string | null): void {
        if (key !== null) {
            setYear(key);
        }        
    }

    function yearChangeText(e: ChangeEvent<HTMLInputElement>): void {
        const key: string | null = e.target.value;
        if (key !== null && !isNaN(parseInt(key))) {
            setYear(String(parseInt(key)));
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
                <DropdownButton id="dropdown-season" title={dropdownSeason} onSelect={handleSeasonSelect} data-testid="seasonDropdown">
                    <Dropdown.Item eventKey="Fall" data-testid="FallDropdown">Fall</Dropdown.Item>
                    <Dropdown.Item eventKey="Winter" data-testid="WinterDropdown">Winter</Dropdown.Item>
                    <Dropdown.Item eventKey="Spring" data-testid="SpringDropdown">Spring</Dropdown.Item>
                    <Dropdown.Item eventKey="Summer" data-testid="SummerDropdown">Summer</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col className="text-center" md="auto">
                <Row>
                    <DropdownButton id="dropdown-year" title={year} onSelect={yearChangeDropdown}>
                        {years.map((y: string) => {
                            return <Dropdown.Item key={y} eventKey={y}>{y}</Dropdown.Item>;
                        })}
                    </DropdownButton>
                    {sameSemWarn && <p className="sameSemWarning">
                        That semester is already in the plan
                    </p>}
                </Row>
                <Row>
                    <Form>
                        <Form.Label>Select or input year</Form.Label>
                        <Form.Control type="Year" placeholder="2022" onChange={yearChangeText}/>
                    </Form>
                </Row>
            </Col>
            <Col>
                <Button type="submit" onClick={addSemester}>Submit</Button>
            </Col>
        </Row>
    </Container>;
}