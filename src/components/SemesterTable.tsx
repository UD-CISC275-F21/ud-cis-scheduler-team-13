import { Course } from "../interfaces/Course";
import React, { Table } from "react-bootstrap";

export function SemesterTable(): JSX.Element {
    const courses: Course[] = [
        {id: "CISC275", name: "Introduction to Software Engineering", description: "whatever 1", prereqs: ["1", "2"]},
        {id: "CISC181", name: "cisc181 name", description: "whatever 2", prereqs: ["3", "4"]},
        {id: "CISC210", name: "cisc210 name", description: "whatever 3", prereqs: ["5", "6"]}];

    return (<Table>
        <thead>
            <tr>
                <th>id</th><th>name</th><th>description</th><th>prereqs</th>
            </tr>
        </thead>
        <tbody>
            { courses.map((course: Course) => {
                return (<tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.description}</td>
                    <td>{course.prereqs}</td>
                </tr>);
            })}
        </tbody>
    </Table>);
}