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

// test("add semester to plan", () => {

// });