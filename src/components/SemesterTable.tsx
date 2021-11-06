import { Course } from "../interfaces/Course";
import React, { Button, Container, Table, Row, Col } from "react-bootstrap";
import { AddCourse } from "./AddCourse";
import { RemoveCourse } from "./RemoveCourse";
import ClearTable from "./ClearTable";
import { EditCourse } from "./EditCourse";


export function SemesterTable({semesterName, creditLimit, allCourses, setAllCourses}: {
        semesterName: string, 
        creditLimit: number,
        allCourses: Record<string, Course[]>
        setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const courses: Course[] = allCourses[semesterName];

    function removeSemester(): void {
        const copyCourses = {...allCourses};
        const len: number = copyCourses[semesterName].length;
        for (let i = 0; i < len; i++) {
            copyCourses.Remaining.push(copyCourses[semesterName][0]);
            copyCourses[semesterName].splice(0,1);
        }
        delete copyCourses[semesterName];
        setAllCourses(copyCourses);
    }

    return <Container className = "m-2 p-4 border border-primary">
        <Row>
            <Col xs={7}>
                <h4>
                    {semesterName}, Credit Limit: {creditLimit}
                </h4>
            </Col>
            <Col className="text-end">
                <Button variant="danger" size="sm" onClick={removeSemester}>Remove Semester</Button>
            </Col>
        </Row>
        <Row>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th><th>Name</th><th>Description</th><th>Prereqs</th><th></th>
                        {/*<th>ID</th><th>Name</th><th>Prereqs</th><th></th>     */}                
                    </tr>
                </thead>
                <tbody>
                    { courses.map((course: Course) => {
                        return <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name.replace(course.id + " - ","")}</td>
                            <td>{course.description}</td>
                            <td>{course.prereqs}</td>
                            <EditCourse course={course} allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></EditCourse>
                        </tr>;
                    })}
                </tbody>
            </Table>
        </Row>
        <Row>
            <Col><AddCourse allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></AddCourse></Col>
            <Col><RemoveCourse allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></RemoveCourse></Col>
            <Col><ClearTable allCourses={allCourses} setAllCourses={setAllCourses} semesterName={semesterName}></ClearTable></Col>
        </Row>
    </Container>;
}