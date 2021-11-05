import { Course } from "../interfaces/Course";
import React, { Button } from "react-bootstrap";

export default function RemoveCourse({allCourses, setAllCourses, semesterName}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void, 
    semesterName: string}): JSX.Element {

    function courseSubmit(){
        const copyCourses = {...allCourses};
        const len: number = copyCourses[semesterName].length;
        for (let i = 0; i < len; i++) {
            copyCourses.Remaining.push(copyCourses[semesterName][0]);
            copyCourses[semesterName].splice(0,1);
        }
        setAllCourses(copyCourses);
    }

    const handleRemove = () => courseSubmit();

    return(
        <div>
            <Button variant="primary" onClick={handleRemove}>
                Remove All Courses
            </Button>
        </div>
    );
}

