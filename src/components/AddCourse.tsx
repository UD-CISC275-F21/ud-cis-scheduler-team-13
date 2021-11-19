import { Course } from "../interfaces/Course";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, ChangeEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Catalog from "../assets/Catalog.json";
import FormControl from "@mui/material/FormControl";


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
                            <Autocomplete
                                sx={{ width: 465 }}
                                options={Catalog}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderInput={params => (
                                    <TextField
                                        onChange={courseChange}
                                        onKeyPress={keyDownHandler}
                                        {...params}
                                        label="Enter Course Name"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: "new-password", // disable autocomplete and autofill
                                        }}
                                    />
                                )}
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

