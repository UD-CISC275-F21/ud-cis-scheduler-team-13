import React from "react";
import { render, screen, within } from "@testing-library/react";
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

function addCourse(semesterName: string, courseID: string) {
    const addCourseButton = within(screen.getByRole("table", {name: semesterName})).getByRole("button", {name: "Add Course"});
    userEvent.click(addCourseButton);

    userEvent.type(screen.getByRole("textbox", {name: "addCourseTextbox"}),courseID+"{enter}");
}

function addSemester(season: string, year: string) {
    // Click year dropdown
    const yearButton = screen.getByRole("button", {name: "2022"});
    userEvent.click(yearButton);

    // Select year
    userEvent.click(screen.getByRole("button", {name: year}));

    // Click season dropdown
    const seasonButton = screen.getByTestId("seasonDropdown");
    userEvent.click(seasonButton);

    // Select season
    userEvent.click(within(seasonButton).getByRole("button", {name: season}));

    // Click submit to add the semester
    const submitButton = screen.getByRole("button", {name: "Submit"});
    userEvent.click(submitButton);
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

// These tests rely on the display of a semester
// Should be "SeasonYear" such as Fall2022

test("add semester to plan", async () => {
    goToScheduler();

    const newSemesterStr = "Fall2025";
    const season = "Fall";
    const year = "2025";

    // Check if Fall2025 semester is there, it shouldn't be
    const missingSemester = screen.queryByText(newSemesterStr);
    expect(missingSemester).not.toBeInTheDocument();

    addSemester(season, year);
    
    // Expect Fall2025 to be there
    const newSemester = screen.getByRole("table", {name: newSemesterStr});
    expect(newSemester).toBeInTheDocument();
});

test("remove semester from plan", () => {
    goToScheduler();

    const fall2020SemStr = "Fall2020, Credit Limit: 21";

    const fall2020Semester = screen.getByRole("table", {name: "Fall2020"});
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

    const courseStr = "CISC 275";
    const semesterStr = "Fall2020";
    addCourse(semesterStr,courseStr);

    const semester = screen.getByRole("table", {name: semesterStr});
    const remCourseButton = within(semester as HTMLElement).getByRole("button", {name: "Remove Course"});
    userEvent.click(remCourseButton);

    const enterCourse = screen.getByRole("textbox", {name: "removeCourseTextbox"});
    userEvent.type(enterCourse as HTMLElement, courseStr+"{enter}");

    const course = screen.queryByText(courseStr);
    expect(course).not.toBeInTheDocument();
});

test("add course", async () => {
    goToScheduler();

    const courseStr = "CISC 275";
    expect(screen.queryByText(courseStr)).not.toBeInTheDocument();

    addCourse("Fall2020",courseStr);

    await screen.findByText(courseStr);
    expect(screen.getByText(courseStr)).toBeInTheDocument();
});

test("remove all courses in semester", async () => {
    goToScheduler();

    const courses: string[] = ["CISC 275", "DANC 312"];
    const semesterStr = "Fall2020";

    for (let i = 0; i < courses.length; i++) {
        addCourse(semesterStr, courses[i]);
    }

    const semester = screen.getByRole("table", {name: semesterStr});
    const remAllCoursesButton = within(semester as HTMLElement).getByRole("button", {name: "Remove All Courses"});
    userEvent.click(remAllCoursesButton);

    for (let i = 0; i < courses.length; i++) {
        expect(screen.queryByText(courses[i])).not.toBeInTheDocument();
    }
});

test("edit course", () => {
    goToScheduler();

    const courses: string[] = ["CISC 275", "CISC 476", "DANC 312"];
    const semesterStr = "Fall2020";

    for (let i = 0; i < courses.length; i++) {
        addCourse(semesterStr,courses[i]);
    }

    const semester = screen.getByRole("table", {name: semesterStr});
    const editCourseButton = within(semester as HTMLElement).getAllByRole("button", {name: "Edit"})[0];
    userEvent.click(editCourseButton);

    const newName = "NEW NAME";
    userEvent.type(screen.getByRole("textbox", {name: "Enter New Name"}), "{selectall}{backspace}"+newName+"{enter}");

    expect(screen.getByText(newName)).toBeInTheDocument();
});

test("clear all courses from all semesters", () => {
    goToScheduler();

    const semesterStr = "Fall2020";
    const courses: string[] = ["CISC 275", "DANC 310", "DANC 313"];
    for (let i = 0; i < courses.length; i++) {
        addCourse(semesterStr, courses[i]);        
    }

    userEvent.click(screen.getByRole("button", {name: "ClearAllTables"}));

    for (let i = 0; i < courses.length; i++) {
        expect(screen.queryByText(courses[i])).not.toBeInTheDocument();
    }
});

test("remove all semesters", () => {
    goToScheduler();

    const semesters: string[] = ["Fall2020", "Spring2021", "Summer2021"];
    for (let i = 0; i < semesters.length; i++) {
        const semester = screen.getByRole("table", {name: semesters[i]});
        expect(semester).toBeInTheDocument();
    }

    userEvent.click(screen.getByRole("button", {name: "Remove All Semesters"}));

    for (let i = 0; i < semesters.length; i++) {
        expect(screen.queryByRole("table", {name: semesters[i]})).not.toBeInTheDocument();
    }
});