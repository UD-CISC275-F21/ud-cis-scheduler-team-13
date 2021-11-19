import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { Course } from "../interfaces/Course";

export function Export({AllCourses}:{
    AllCourses: Record<string, Course[]>
}): JSX.Element {

    const data:Course[] = [];

    Object.keys(AllCourses).map((key) => {
        if(key !== "Remaining"){
            AllCourses[key].forEach((item) => {
                data.push({ semester:key, id: item.id, name:item.name, credits: item.credits } );
            });
        }
    });

    return(
        <div>
            <CSVLink 
                data={data}
                filename="My-Schedule.csv"
                className=""
            >
                <Button variant="success">Save Schedule</Button>
            </CSVLink>
           
        </div>
    );
}

