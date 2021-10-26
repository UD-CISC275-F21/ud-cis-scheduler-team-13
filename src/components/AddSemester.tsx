import { useState } from "react";
import React, { Container, Dropdown, DropdownButton, Form } from "react-bootstrap";

export function AddSemester(): JSX.Element {
    const [dropdownSeason, setDropdownSeason] = useState<string>("Fall");

    return <Container>
        <Form>
            <DropdownButton id="dropdown-season" title={dropdownSeason}>
                <Dropdown.Item>Fall</Dropdown.Item>
                <Dropdown.Item>Winter</Dropdown.Item>
                <Dropdown.Item>Spring</Dropdown.Item>
                <Dropdown.Item>Summer</Dropdown.Item>
            </DropdownButton>
        </Form>
    </Container>;
}