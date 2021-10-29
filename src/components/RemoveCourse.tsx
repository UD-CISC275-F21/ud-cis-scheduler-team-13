import { Course } from "../interfaces/Course";
import React, { Button, Form, Modal } from "react-bootstrap";
import catalog from "../assets/Catalog.json";
import { useState, ChangeEvent } from "react";

export function RemoveCourse({allCourses, setAllCourses, semesterName}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void, 
    semesterName: string}): JSX.Element {
    
    const [inputCourse, setInputCourse] = useState<string>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function courseChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputCourse(e.target.value);
    }

    function courseSubmit(){
        const copyCourses = {...allCourses};
        for (let i = 0; i < copyCourses[semesterName].length; i++) {
            if (copyCourses[semesterName][i].id === inputCourse){
                copyCourses.Remaining.push(copyCourses[semesterName][i]);
                copyCourses[semesterName].splice(i,1);
            }
        }
        setAllCourses(copyCourses);
        handleClose();
    }

    return(
        <div>
            <Button variant="primary" onClick={handleShow}>
                Remove Course
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Type Name of Course Below:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Enter Course</Form.Label>
                        <Form.Control type="Course" placeholder="Enter Course Name" onChange={courseChange} />
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

