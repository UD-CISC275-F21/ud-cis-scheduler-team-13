import { SemesterTable } from "./SemesterTable";
import React, { Container, Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/Course";
import { useState } from "react";
import { AddSemester } from "./AddSemester";
import { ClearAllTables } from "./ClearAllTables";
import { ClearAllSemesters } from "./ClearAllSemesters";
import { LocalSave } from "./LocalSave";
import catalog from "../assets/Catalog.json";
import { partitionSemesters, getCreditLim } from "../utils/semesterUtils";
import { Import } from "./Import";
import { Export } from "./Export";

export function AllSemestersTable(): JSX.Element {

    // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
    // User Eydrian
    // Remove duplicate courses
    let fixedCatalog: Course[] = catalog;
    fixedCatalog = fixedCatalog.filter((element, index, array) => {
        const foundIndex = array.findIndex((c) => {
            return c.id === element.id;
        });
        return index === foundIndex;
    });

    // Take list of courses and sort them into default semesters,
    // or maybe leave semesters blank by default
    const defaultCourses: Record<string, Course[]> = {
        "Fall2020": [fixedCatalog[0] as Course],
        "Spring2021": [fixedCatalog[1] as Course],
        "Summer2021": [fixedCatalog[2] as Course],
        "Winter2021": [fixedCatalog[3] as Course],
        "Remaining": fixedCatalog.slice(4) as Course[]};


    // Hook to track courses across semesters
    // Pass this into SemesterTable
    const [allCourses, setAllCourses] = useState<Record<string, Course[]>>(defaultCourses);
    
    const partitionedKeys = partitionSemesters(allCourses, 2);

    return <Container>
        <AddSemester allCourses={allCourses} setAllCourses={setAllCourses}></AddSemester>
        {partitionedKeys.map((nKeys: string[]) => {
            return <Row key={nKeys[1]+nKeys[2]}>
                {nKeys.map((key: string) => {
                    return <Col key={key}>
                        <SemesterTable semesterName={key} creditLimit={getCreditLim(key)} 
                            allCourses={allCourses} setAllCourses={setAllCourses}></SemesterTable>
                    </Col>;
                })}
            </Row>;
        })}
        <Row className="m-3">
            <Col className="text-end">
                <ClearAllTables allCourses={allCourses} setAllCourses={setAllCourses} />
            </Col>
            <Col>
                <ClearAllSemesters allCourses={allCourses} setAllCourses={setAllCourses} />
            </Col>            
        </Row>
        <Row>
            <LocalSave allCourses={allCourses} setAllCourses={setAllCourses}/>
        </Row>
        <Row className="m-3">
            <Col className="text-end">
                <Export AllCourses={allCourses} />
            </Col>
            <Col>
                <Import />
            </Col>
        </Row>
    </Container>;
}