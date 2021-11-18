import React from "react";
import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

function goToWelcomePage() {
    render(<App />);
    userEvent.click(screen.getByText("UD CIS Scheduler"));
}

function goToScheduler() {
    goToWelcomePage();
    userEvent.click(screen.getByText("Create New Schedule"));
}

test("renders UD CIS Scheduler text", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD CIS Scheduler/i);
    expect(linkElement).toBeInTheDocument();
});

test("welcomes user on open", () => {
    goToWelcomePage();
    const welcomeMessage = screen.getByText("Welcome to the CIS Scheduler!");
    const instruction = screen.getByText("To Continue to the Scheduler, press the button below.");
    expect(welcomeMessage).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
});

test("renders AddSemester", () => {
    goToScheduler();
    const addHeader = screen.getByText("Add Semester to Plan");
    expect(addHeader).toBeInTheDocument();
});


// These tests rely on the default semesters
// (i.e. Fall2022 should not be on the scheduler by default)
// Also they rely on the display of a semester
// Should be "SeasonYear" such as Fall2022
// Probably un-hard-code this later

test("add semester to plan", () => {
    goToScheduler();

    // Check if Fall2022 semester is there, it shouldn't be
    const missingSemester = screen.queryByText("Fall2022");
    expect(missingSemester).not.toBeInTheDocument();

    // Click submit to add the Fall2022 semester
    const submitButton = screen.getByRole("button", {name: "Submit"});
    userEvent.click(submitButton);
    
    // Expect Fall2022 to be there
    const newSemester = screen.getByText("Fall2022, Credit Limit: 21");
    expect(newSemester).toBeInTheDocument();
});

test("remove semester from plan", () => {
    goToScheduler();

    const fall2020SemStr = "Fall2020, Credit Limit: 21";

    const fall2020Semester = screen.getByText(fall2020SemStr).parentNode.parentNode;
    const removeSemButton = within(fall2020Semester as HTMLElement).getByRole("button", {name: "Remove Semester"});
    
    userEvent.click(removeSemButton);
    const noFall2020 = screen.queryByText(fall2020SemStr);
    expect(noFall2020).not.toBeInTheDocument();
});

test("render remove course modal", () => {
    goToScheduler();

    const remCourseButton = screen.getAllByRole("button", {name: "Remove Course"})[0];
    userEvent.click(remCourseButton);

    const modalHeader = screen.getByText("Type Name of Course Below:");
    expect(modalHeader).toBeInTheDocument();
});

test("remove course", () => {
    goToScheduler();

    const courseStr = "CISC 101";

    const semester = screen.getByText(courseStr).parentNode.parentNode.parentNode.parentNode.parentNode;
    const remCourseButton = within(semester as HTMLElement).getByRole("button", {name: "Remove Course"});
    userEvent.click(remCourseButton);

    const modal = screen.getByText("Type Name of Course Below:").parentNode.parentNode;
    const enterCourse = within(modal as HTMLElement).getByRole("textbox");
    userEvent.type(enterCourse as HTMLElement, courseStr+"{enter}");

    const course = screen.queryByText(courseStr);
    expect(course).not.toBeInTheDocument();
});

test("add course", () => {
    goToScheduler();

    const courseStr = "CISC 275";

    expect(screen.queryByText(courseStr)).not.toBeInTheDocument();

    userEvent.click(screen.getAllByRole("button", {name: "Add Course"})[0]);
    const enterCourse = screen.getByRole("textbox");
    userEvent.type(enterCourse as HTMLElement, courseStr+"{enter}");

    expect(screen.getByText(courseStr)).toBeInTheDocument();
});

test("remove all courses in semester", () => {
    goToScheduler();

    const courseStr = "CISC 101";

    expect(screen.getByText(courseStr)).toBeInTheDocument();

    const semester = screen.getByText(courseStr).parentNode.parentNode.parentNode.parentNode.parentNode;
    const remAllCoursesButton = within(semester as HTMLElement).getByRole("button", {name: "Remove All Courses"});
    userEvent.click(remAllCoursesButton);

    expect(screen.queryByText(courseStr)).not.toBeInTheDocument();
});

test("edit course", () => {
    goToScheduler();

    const courseStr = "CISC 101";

    const semester = screen.getByText(courseStr).parentNode.parentNode.parentNode.parentNode.parentNode;
    const editCourseButton = within(semester as HTMLElement).getByRole("button", {name: "Edit"});
    userEvent.click(editCourseButton);

    const modal = screen.getByText("Edit Course Information").parentNode.parentNode;
    const newName = "NEW NAME";
    userEvent.type(within(modal as HTMLElement).getByRole("textbox", {name: "Enter New Name"}), "{selectall}{backspace}"+newName+"{enter}");

    expect(screen.getByText(newName)).toBeInTheDocument();
});