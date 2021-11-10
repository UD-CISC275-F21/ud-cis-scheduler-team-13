import { Course } from "../interfaces/Course";
import React, { Button, Container, Table, Row, Col, Collapse } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AddCourse } from "./AddCourse";
import { RemoveCourse } from "./RemoveCourse";
import ClearTable from "./ClearTable";
import { EditCourse } from "./EditCourse";


export function SemesterTable({semesterName, creditLimit, allCourses, setAllCourses}: {
        semesterName: string, 
        creditLimit: number,
        allCourses: Record<string, Course[]>
        setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const defaultOpened: Record<string, boolean> = {};
    const courses: Course[] = allCourses[semesterName];

    const [opened, setOpened] = useState<Record<string, boolean>>(defaultOpened);

    useEffect(()=>{

        // Update courses (keys) in opened state for course descriptions
        const copyOpened = {...opened};
        let needUpdate = false;
        const courseIDs: string[] = courses.map(c => c.id);

        // Adding a course to opened 
        let len: number = courses.length;
        for (let i = 0; i < len; i++) {
            if (!Object.keys(copyOpened).includes(courseIDs[i])) {
                // if opened does not include a course it should
                copyOpened[courseIDs[i]] = false;
                console.log("added course to opened");
                needUpdate = true;
            }
        } 

        // Removing a course from opened
        const openedKeys: string[] = Object.keys(copyOpened);
        len = openedKeys.length;
        for (let i = 0; i < len; i++) {
            if (!courseIDs.includes(openedKeys[i])) {
                // if opened has a course it should not have
                delete copyOpened[openedKeys[i]];
                console.log("removed course from opened");
                needUpdate = true;
            }
        }

        if (needUpdate) {
            setOpened(copyOpened);
        }        
    });

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

    function toggleOpen(id: string) {
        const copyOpened = {...opened};
        if (Object.keys(copyOpened).includes(id)) {
            copyOpened[id] = !copyOpened[id];
        } else {
            copyOpened[id] = true;
        }
        setOpened(copyOpened);
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
                            <td>
                                <Button onClick={() => toggleOpen(course.id)} size="sm" >
                                    Show description
                                </Button>
                                <Collapse in={opened[course.id]}>
                                    {course && <p>{course.description}</p>}
                                </Collapse>
                            </td>
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