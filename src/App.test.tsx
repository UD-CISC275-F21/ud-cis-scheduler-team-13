import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

function goToWelcomePage() {
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
    render(<App />);
    goToWelcomePage();
    const welcomeMessage = screen.getByText("Welcome to the CIS Scheduler!");
    const instruction = screen.getByText("To Continue to the Scheduler, press the button below.");
    expect(welcomeMessage).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
});

test("renders AddSemester", () => {
    render(<App />);
    goToScheduler();
    const addHeader = screen.getByText("Add Semester to Plan");
    expect(addHeader).toBeInTheDocument();
});


// These tests rely on the default semesters
// (i.e. Fall2022 should not be on the scheduler by default)
// Also they rely on the display of a semester
// Should be "SeasonYear" such as Fall2022

test("add semester to plan", () => {
    render(<App />);
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
    render(<App />);
    goToScheduler();

    const fall2020SemStr = "Fall2020, Credit Limit: 21";

    const fall2020Semester = screen.getByText(fall2020SemStr).parentNode.parentNode;
    const removeSemButton = within(fall2020Semester as HTMLElement).getByRole("button", {name: "Remove Semester"});
    
    userEvent.click(removeSemButton);
    const noFall2020 = screen.queryByText(fall2020SemStr);
    expect(noFall2020).not.toBeInTheDocument();
});