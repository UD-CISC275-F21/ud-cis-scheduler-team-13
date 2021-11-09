import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { useState } from "react";
import { AddSemester } from "./AddSemester";
import { ClearAllTables } from "./ClearAllTables";
import { ClearAllSemesters } from "./ClearAllSemesters";
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

        // Sort chronologically
        keys.sort(compareSemesters);

        for (let i = 0; i < keys.length; i += n) {
            partitioned[partitioned.length] = keys.slice(i, i+n);
        }
        return partitioned;
    }

    function compareSemesters(semA: string, semB: string): number {
        // Compare fn for semester names: Winter2022, Fall2021, Spring2021, etc.
        // would be sorted to: Spring2021, Fall2021, Winter2022

        const seasonA: string = semA.substring(0,semA.length-4);
        const seasonB: string = semA.substring(0,semB.length-4);

        const yearA: number = parseInt(semA.substring(semA.length-4,semA.length),10);
        const yearB: number = parseInt(semB.substring(semB.length-4,semB.length),10);

        const valueA = yearA*4 + seasonToVal(seasonA);
        const valueB = yearB*4 + seasonToVal(seasonB);

        return valueA - valueB;
    }

    function seasonToVal(season: string): number {
        switch(season) {
        case "Winter":
            return 0;
        case "Spring":
            return 1;
        case "Summer":
            return 2;
        case "Fall": 
            return 3;
        }
        return 0;
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
        <Row>
            <Col>
                <ClearAllTables allCourses={allCourses} setAllCourses={setAllCourses} />
            </Col>
            <Col>
                <ClearAllSemesters allCourses={allCourses} setAllCourses={setAllCourses} />
            </Col>
        </Row>
    </Container>;
}