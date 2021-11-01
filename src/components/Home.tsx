import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <div className="Welcome-message">
            <div>
                <h1> Welcome to the UD CIS Scheduler!</h1>
            </div>
            <div>
                <p>
                    The UD CIS Scheduler is design so students, either new to the University or taking CIS courses to fullful minor requirements, can build a customizable schedule for the remaining time of their school career.
                    You can add and remove semesters as well as look at the prerequisites, credit limit and descriptions of all the courses you will ever need! This is the most exciting and personal way to build the perfect schedule specially
                    made for you, by you.
                </p>
                <br />
                <p>
                    To Continue to the Scheduler, press the button below.
                </p>
                <div className="initial-schedule">
                    <Link to="/scheduler">
                        <Button>Create New Schedule</Button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Home;