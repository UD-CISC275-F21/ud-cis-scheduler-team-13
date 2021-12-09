import { Course } from "../interfaces/Course";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, ChangeEvent } from "react";
import Select from "react-Select";


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

    function courseOptions() {
        const options: Course[] = [];

        const copyCourses = {...allCourses};
        for (let i = 0; i < copyCourses.Remaining.length; i++) {
            copyCourses.Remaining[i].id.push(options.id);
            copyCourses.Remaining[i].id.push(options);
            copyCourses.Remaining[i].id.push(options);
        }
    
    }


    function courseChange(e: ChangeEvent<HTMLInputElement>): void {
        setInputCourse(e.target.value);
    }

    function courseSubmit(){
        const copyCourses = {...allCourses};
        for (let i = 0; i < copyCourses.Remaining.length; i++) {
            if (copyCourses.Remaining[i].id === inputCourse){
                copyCourses[semesterName].push(copyCourses.Remaining[i]);
                copyCourses.Remaining.splice(i,1);
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
                        <Select
                            className="basic-single"
                            classNamePrefix="i.e. CISC 220"
                            defaultValue={colourOptions[0]}
                            name="color"
                            options={courseOptions}
                        />
                        <Form.Control type="Course" onChange={courseChange} onKeyPress={keyDownHandler}/>
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

