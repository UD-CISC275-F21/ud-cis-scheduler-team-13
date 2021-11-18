import React from "react";
import { render, screen } from "@testing-library/react";
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

test("add semester to plan", () => {
    // This test relies on the default semesters
    // (i.e. Fall2022 should not be on the scheduler by default)
    // Also relies on the display of a semester
    // Should be "SeasonYear" such as Fall2022

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