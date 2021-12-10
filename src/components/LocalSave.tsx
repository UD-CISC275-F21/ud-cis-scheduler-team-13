import { Course } from "../interfaces/Course";
import React, { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

const LOCAL_STORAGE_COURSES = "allCourses";

export function LocalSave({allCourses, setAllCourses}: {
    allCourses: Record<string, Course[]>,
    setAllCourses: (c: Record<string, Course[]>)=>void}): JSX.Element {

    const [warnNoLoad, setWarnNoLoad] = useState<boolean>(false);

    function savePlan(): void {
        localStorage.setItem(LOCAL_STORAGE_COURSES,JSON.stringify(allCourses));

        if (warnNoLoad) {
            setWarnNoLoad(false);
        }
    }

    function loadPlan(): void {
        const stringyCourses: string | null = localStorage.getItem(LOCAL_STORAGE_COURSES);
        if (stringyCourses !== null) {
            setAllCourses(JSON.parse(stringyCourses));
        } else {
            setWarnNoLoad(true);
        }
    }
    
    return(
        <Container>
            <Row>
                <Col className="text-end">
                    <Button variant="primary" onClick={savePlan}>
                        Save Current Plan
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={loadPlan}>
                        Load Plan
                    </Button>
                </Col>
            </Row>
            <Row className="text-center">
                {warnNoLoad && <p className="sameSemWarning">There is no plan saved</p>}
            </Row>
        </Container>
    );
}

