import { Course } from "../interfaces/Course";
import React, { Container, Table } from "react-bootstrap";
import internal from "stream";

export function SemesterTable({semesterName, creditLimit, courses}: {
        semesterName: string, 
        creditLimit: number,
        courses: Course[]}): JSX.Element {

    return <Container>
        <h4>
            {semesterName}, credit limit: {creditLimit}
        </h4>
        
        <Table>
            <thead>
                <tr>
                    <th>ID</th><th>Name</th><th>Description</th><th>Prereqs</th>
                </tr>
            </thead>
            <tbody>
                { courses.map((course: Course) => {
                    return <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.name}</td>
                        <td>{course.description}</td>
                        <td>{course.prereqs}</td>
                    </tr>;
                })}
            </tbody>
        </Table>
    </Container>;
}