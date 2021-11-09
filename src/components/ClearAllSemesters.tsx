import { Course } from "../interfaces/Course";
import React, { Button } from "react-bootstrap";

export function ClearAllSemesters({allCourses, setAllCourses}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    function removeCourses(semesterName: string){
        const copyCourses = {...allCourses};
        const len: number = copyCourses[semesterName].length;
        for (let i = 0; i < len; i++) {
            copyCourses.Remaining.push(copyCourses[semesterName][0]);
            copyCourses[semesterName].splice(0,1);
        }
        setAllCourses(copyCourses);
    }

    function deleteSemesters() {
        const copyCourses = {...allCourses};
        const semNames: string[] = Object.keys(copyCourses);
        for (let i = 0; i < semNames.length; i++) {            
            if (semNames[i] !== "Remaining") {
                delete copyCourses[semNames[i]];
            }            
        } 
        setAllCourses(copyCourses);
    }

    const handleRemove = () => {
        const semNames = Object.keys(allCourses);
        for (let i = 0; i < semNames.length; i++) {
            removeCourses(semNames[i]);
        }        

        deleteSemesters();
    };

    return(
        <div>
            <Button variant="primary" onClick={handleRemove}>
                Remove All Semesters
            </Button>
        </div>
    );
}

