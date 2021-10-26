import { Course } from "../interfaces/Course";
import React, { Container, Table } from "react-bootstrap";

export function SemesterTable({semesterName, courses}: {semesterName: string, courses: Course[]}): JSX.Element {
    // const courses: Course[] = [
    //     {id: "CISC275", name: "Introduction to Software Engineering", description: "Description 1", prereqs: ["CISC220"]},
    //     {id: "CISC181", name: "Introduction to Computer Science II", description: "Description 2", prereqs: ["CISC108"]},
    //     {id: "CISC210", name: "Introduction to Systems Programming", description: "Description 3", prereqs: ["CISC108"]}];
    
    // Different semesters have different credit limits
    // Uncomment lines when use for creditLim is implemented
    // if (semesterName === "Fall" || semesterName === "Spring") {
    //     const creditLim = 21;
    // } else if (semesterName === "Winter" || semesterName === "Summer") {
    //     const creditLim = 7;
    // }

    return <Container>
        <h4>
            {semesterName}
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