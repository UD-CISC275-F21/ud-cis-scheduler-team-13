import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { useState } from "react";
import { AddSemester } from "./AddSemester";
import catalog from "../assets/Catalog.json";

export function AllSemestersTable(): JSX.Element {
    // Take list of courses and sort them into default semesters,
    // or maybe leave semesters blank by default
    const defaultCourses: Record<string, Course[]> = {
        "Fall2020": [catalog[0] as Course],
        "Spring2021": [catalog[1] as Course],
        "Summer2021": [catalog[2] as Course],
        "Winter2021": [catalog[3] as Course],
        "Remaining": catalog.slice(4) as Course[]};

    // Hook to track courses across semesters
    // Pass this into SemesterTable
    const [allCourses, setAllCourses] = useState<Record<string, Course[]>>(defaultCourses);

    // https://stackoverflow.com/questions/11345296/partitioning-in-javascript
    // user starbeamrainbowlabs
    function partitionSemesters(allCourses: Record<string, Course[]>, n: number): string[][] {
        // Returns allCourses keys partioned by n
        // example: [Fall, Summer, Winter, Spring] -> [[Fall, Summer], [Winter, Spring]]
        const keys = Object.keys(allCourses);
        const partitioned: string[][] = [];

        // Remove Remaining key
        const index: number = keys.indexOf("Remaining");
        if (index > -1) {
            keys.splice(index,1);
        }

        for (let i = 0; i < keys.length; i += n) {
            partitioned[partitioned.length] = keys.slice(i, i+n);
        }
        return partitioned;
    }

    function getCreditLim(semesterName: string): number {
        if (semesterName.includes("Fall") || semesterName.includes("Spring")) {
            return 21;
        } else if (semesterName.includes("Winter") || semesterName.includes("Summer")) {
            return 7;
        } else {
            return -1; // this shouldn"t happen lol
        }
    }
    
    const partitionedKeys = partitionSemesters(allCourses, 2);

    return <Container>
        <AddSemester allCourses={allCourses} setAllCourses={setAllCourses}></AddSemester>
        {partitionedKeys.map((nKeys: string[]) => {
            return <Row key={nKeys[1]}>
                {nKeys.map((key: string) => {
                    return <Col key={key}>
                        <SemesterTable semesterName={key} creditLimit={getCreditLim(key)} 
                            allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable>
                    </Col>;
                })}
            </Row>;
        })}
    </Container>;
}