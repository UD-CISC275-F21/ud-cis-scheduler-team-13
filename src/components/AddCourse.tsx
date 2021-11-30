import { Course } from "../interfaces/Course";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, ChangeEvent } from "react";

export function AddCourse({allCourses, setAllCourses, semesterName}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void, 
    semesterName: string}): JSX.Element {
    
    const [inputCourse, setInputCourse] = useState<string>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            courseSubmit();
            event.preventDefault();
        }
    };

    function courseChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputCourse(e.target.value);
    }

    function courseSubmit(){

        // If the course already exists in the current semester, stop without adding
        const currentSemesterCourseIDs: string[] = allCourses[semesterName].map( (c: Course) => c.id);
        if (currentSemesterCourseIDs.includes(inputCourse)) {
            // Warn user about trying to add the course to the same semester
            handleClose();
            return;
        }

        const copyCourses = {...allCourses};

        // Find courses
        const semesterKeys: string[] = Object.keys(copyCourses);
        for (let j = 0; j < semesterKeys.length; j++) {
            // For each semester j
            const currentSemesterCourses: Course[] = copyCourses[semesterKeys[j]];
            for (let i = 0; i < currentSemesterCourses.length; i++) {
                // For each course i in semester j, find the inputCourse
                if (currentSemesterCourses[i].id === inputCourse){                                    
                    copyCourses[semesterName].push(currentSemesterCourses[i]);

                    // Remove inputCourse from Remaining if it was found in Remaining
                    if (semesterKeys[j] === "Remaining") {
                        copyCourses.Remaining.splice(i,1);
                    }
                }
            }
        }
        setAllCourses(copyCourses);
        handleClose();
    }

    return(
        <div>
            <Button variant="primary" onClick={handleShow}>
                Add Course
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Type Name of Course Below:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Enter Course</Form.Label>
                        <Form.Control type="Course" placeholder="Enter Course Name" onChange={courseChange} onKeyPress={keyDownHandler} aria-label="addCourseTextbox"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={courseSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

