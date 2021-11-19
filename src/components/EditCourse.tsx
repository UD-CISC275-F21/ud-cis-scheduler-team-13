import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, ChangeEvent } from "react";
import { Course } from "../interfaces/Course";

export function EditCourse({course, allCourses, setAllCourses, semesterName}: {
    course: Course,
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void, 
    semesterName: string}): JSX.Element {

    const [nameCourse, setNameCourse] = useState<string>(course.name);
    const [descriptionCourse, setDescriptionCourse] = useState<string>(course.description || "");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            submitChange();
            event.preventDefault();
        }
    };

    function submitChange(){
        const copyCourses = {...allCourses};
        const editedCourses = copyCourses[semesterName].find((c) => c.id === course.id);
        if(editedCourses){
            editedCourses.name = nameCourse;
            editedCourses.description = descriptionCourse;
        }
        setAllCourses(copyCourses);
        handleClose();
    }

    function nameChange(e: ChangeEvent<HTMLInputElement>): void {
        setNameCourse(e.target.value);
    }

    function descriptionChange(e: ChangeEvent<HTMLInputElement>): void {
        setDescriptionCourse(e.target.value);
    }

    return(
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Course Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Edit name of course</Form.Label>
                        <Form.Control value={nameCourse} type="Course" placeholder="Enter New Name" onChange={nameChange} onKeyPress={keyDownHandler} aria-label="Enter New Name"/>
                    </Form>
                    <Form>
                        <Form.Label>Edit description of course</Form.Label>
                        <Form.Control value={descriptionCourse} type="Course" placeholder="Enter Description" onChange={descriptionChange} onKeyPress={keyDownHandler}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitChange}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

