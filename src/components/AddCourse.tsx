import { Course } from "../interfaces/Course";
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";


export function AddCourse({allCourses, setAllCourses, semesterName}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void, 
    semesterName: string}): JSX.Element {
    
    const [inputCourse, setInputCourse] = useState<string>("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onchangeSelect = (newValue: SingleValue<Course>) => {
        setInputCourse(newValue?.id || "");
    };
    
    function courseSubmit(){

        // If the course already exists in the current semester, stop without adding
        const currentSemesterCourseIDs: string[] = allCourses[semesterName].map( (c: Course) => c.id);
        if (currentSemesterCourseIDs.includes(inputCourse)) {
            // Warn user about trying to add the course to the same semester
            handleClose();
            return;
        }

        // Course does not exist in the current semester
        const copyCourses = {...allCourses};

        // Find courses
        const semesterKeys: string[] = Object.keys(copyCourses);
        for (let j = 0; j < semesterKeys.length; j++) {
            // For each semester j
            const currentSemesterCourses: Course[] = copyCourses[semesterKeys[j]];
            for (let i = 0; i < currentSemesterCourses.length; i++) {
                // For each course i in semester j, find the inputCourse
                if (semesterName !== semesterKeys[j] && currentSemesterCourses[i].id === inputCourse){                                    
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
                    <Select
                        className="basic-single"
                        placeholder="Select Course"
                        name="course"
                        options={allCourses.Remaining}
                        getOptionLabel={(options: Course) => options.id}
                        getOptionValue={(options: Course) => options.id}
                        onChange={onchangeSelect}
                    />
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
