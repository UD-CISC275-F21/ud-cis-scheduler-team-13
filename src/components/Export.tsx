import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import AllCourses from "../assets/Catalog.json";

export function Export(): JSX.Element {

    const headers = [
        { Label: "ID", key: "id" },
        { Label: "Course Name", key: "name" },
        { Label: "Description", key: "description" },
        { Label: "Credits", key: "credits" },
        { Label: "Prerequisites", key: "prereqs" }
    ];

    return(
        <div>
            {/*
            <CSVLink 
                data={AllCourses}
                header={headers}>
                Save Schedule
            </CSVLink>
            */}

            <Button variant="success"> Download </Button>
        </div>
    );
}

