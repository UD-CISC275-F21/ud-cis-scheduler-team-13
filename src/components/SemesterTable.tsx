import { Course } from "../interfaces/Course";
import React, { Container, Table, Row, Col } from "react-bootstrap";
import { AddCourse } from "./AddCourse";
import { RemoveCourse } from "./RemoveCourse";


export function SemesterTable({semesterName, creditLimit, allCourses, setAllCourses}: {
        semesterName: string, 
        creditLimit: number,
        allCourses: Record<string, Course[]>
        setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const courses: Course[] = allCourses[semesterName];

    return <Container>
        <Row>
            <h4>
                {semesterName}, Credit Limit: {creditLimit}
            </h4>
            
            <Table>
                <thead>
                    <tr>
                        {/* <th>ID</th><th>Name</th><th>Description</th><th>Prereqs</th> */}
                        <th>ID</th><th>Name</th><th>Prereqs</th>                    
                    </tr>
                </thead>
                <tbody>
                    { courses.map((course: Course) => {
                        return <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            {/* <td>{course.description}</td> */}
                            <td>{course.prereqs}</td>
                        </tr>;
                    })}
                </tbody>
            </Table>
        </Row>
        <Row>
            <Col><AddCourse allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></AddCourse></Col>
            <Col><RemoveCourse allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></RemoveCourse></Col>
        </Row>
    </Container>;
}