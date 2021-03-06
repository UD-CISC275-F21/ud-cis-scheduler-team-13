import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <Container className="Welcome-message">
            <div>
                <h1> Welcome to the CIS Scheduler!</h1>
            </div>
            <div>
                <p>
                    This website is design so students, either new to the University or taking CIS courses to fullful minor requirements, can build a customizable schedule for the remaining time of their school career.
                    You can add and remove semesters as well as look at the prerequisites, credit limit and descriptions of all the courses you will ever need! This is the most exciting and personal way to build the perfect schedule specially
                    made for you, by you.
                </p>
                <br />
                <p>
                    To Continue to the Scheduler, press the button below.
                </p>
                <div className="initial-schedule">
                    <Link to="/ud-cis-scheduler-team-13/scheduler">
                        <Button>Create New Schedule</Button>
                    </Link>
                </div>
            </div>

        </Container>
    );
}

export default Home;