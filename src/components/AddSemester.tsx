import { ChangeEvent, SyntheticEvent, useState } from "react";
import React, { Container, Row, Dropdown, DropdownButton, Form, Col, Button } from "react-bootstrap";

export function AddSemester(): JSX.Element {
    const [dropdownSeason, setDropdownSeason] = useState<string>("Fall");
    const [year, setYear] = useState<number>(2022);

    function handleSeasonSelect(key: string | null, event: SyntheticEvent<unknown>): void {
        if (key !== null) {
            setDropdownSeason(key);
        }
    }

    function yearChange(e: ChangeEvent<HTMLInputElement>): void {
        const year: number = parseInt(e.target.value,10);
        setYear(year);
    }

    return <Row>
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
            <Button type="submit">Submit</Button>
        </Col>
    </Row>;
}