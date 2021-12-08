import { Course } from "../interfaces/Course";

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

// https://stackoverflow.com/questions/11345296/partitioning-in-javascript
// user starbeamrainbowlabs
export function partitionSemesters(allCourses: Record<string, Course[]>, n: number): string[][] {
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

export function getCreditLim(semesterName: string): number {
    if (semesterName.includes("Fall") || semesterName.includes("Spring")) {
        return 21;
    } else if (semesterName.includes("Winter") || semesterName.includes("Summer")) {
        return 7;
    } else {
        return -1; // this shouldn"t happen lol
    }
}