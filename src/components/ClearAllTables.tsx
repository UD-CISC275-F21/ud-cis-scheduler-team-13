import { Course } from "../interfaces/Course";
import React, { Button } from "react-bootstrap";

export function ClearAllTables({allCourses, setAllCourses}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    function courseSubmit(semesterName: string){
        const copyCourses = {...allCourses};
        const len: number = copyCourses[semesterName].length;
        for (let i = 0; i < len; i++) {
            copyCourses.Remaining.push(copyCourses[semesterName][0]);
            copyCourses[semesterName].splice(0,1);
        }
        setAllCourses(copyCourses);
    }

    const handleRemove = () => {
        const semNames = Object.keys(allCourses);
        for (let i = 0; i < semNames.length; i++) {
            courseSubmit(semNames[i]);
        }        
    };

    return(
        <div>
            <Button variant="danger" onClick={handleRemove} aria-label="ClearAllTables">
                Remove All Courses
            </Button>
        </div>
    );
}

