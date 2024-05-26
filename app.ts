#!/usr/bin/env node
// Given Task:
//Student Management System:-
// This project is a simple console based Student Management System. In this project you will be learning how to add new students, how to generate a 5 digit unique studentID for each student, how to enroll students in the given courses. Also, you will be implementing the following operations enroll, view balance, pay tuition fees, show status, etc. The status will show all the details of the student including name, id, courses enrolled and balance.This is one of the best projects to implement the Object Oriented Programming concepts.


import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue("\n****Welcome To (SMS) Portal****"));
console.log(chalk.blue("\n****Student Management System****\n"));

let myBalance: number = 0;//It is like a cart, before purchase any course it is zero.

// Display the courses available for enrollment at the welcome page.
console.log(chalk.green("---Following Courses Are Offered This Summer Break---"));

// Display Full Time Courses
console.log(chalk.yellow("\n****Available Courses****\n"));
console.log(chalk.cyan("\n--Semester Courses--\n"));
const semesterCourses: string[] = [
  "Generative AI",
  "Blockchain Specialization",
  "Full Stack Web Development with React Specialization",
  "Web 3.0 and Metaverse",
  "Python",
  "Dockers",
  "MERN stack development",
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "Node.js Developer Course",
];
semesterCourses.forEach((course) => console.log(chalk.magenta(course)));//iterate each course one by one.

// Display Certified Courses
console.log(chalk.cyan("\n****Certified Short Courses****\n"));
const certifiedCourses: string[] = [
  "Node.js Developer Certification",
  "AWS Fundamentals",
  "Ruby Fundamentals",
  "Modern JavaScript From The Beginning",
  "Java Programming Masterclass for Software Developers",
];
certifiedCourses.forEach((course) => console.log(chalk.magenta(course)));

console.log("\n");

const runProgram = async () => {
  const answer = await inquirer.prompt([
    {
      name: "StudentName",
      type: "input",
      message: "Please Enter Your Name",
      validate: (input: string) => {
        const alphabeticRegex = /^[A-Za-z\s]+$/;
        if (input.trim() !== "" && alphabeticRegex.test(input.trim())) {
          return true; // Input is not empty and contains only alphabetic characters and spaces
        } else {
          return "Please Enter a valid name..";
        }
      }
      
    },
    {
      name: "CourseType",
      type: "list",
      message: "Select The Course Type In Which You Want To Enroll In?",
      choices: ["Semester Course", "Certified Course"],
    },
  ]);

  let selectedCourse: string = "";
  let selectedCourseFee: number = 0;//before selection of course

  if (answer.CourseType === "Semester Course") {
    const semCoursesAnswer = await inquirer.prompt([
      {
        name: "SemesterCourse",
        type: "list",
        message: "Select Course To Enroll In:",
        choices: semesterCourses,
      },
    ]);

    const sem_courses_fees: { [key: string]: number } = {
      "Generative AI": 80000,
      "Blockchain Specialization": 60000,
      "Full Stack Web Development with React Specialization": 70000,
      "Web 3.0 and Metaverse": 50000,
      Python: 8000,
      Dockers: 35000,
      "MERN stack development": 75000,
      JavaScript: 15000,
      TypeScript: 25000,
      MongoDB: 20000,
      "Node.js Developer Course": 65000,
    };

    selectedCourse = semCoursesAnswer.SemesterCourse;
    selectedCourseFee = sem_courses_fees[selectedCourse];

    console.log(
      `\n The fee for ${chalk.green(selectedCourse)} is ${chalk.red(
        selectedCourseFee
      )} PKR \n`
    );
  } else {
    const cerCoursesAnswer = await inquirer.prompt([
      {
        name: "CertifiedCourse",
        type: "list",
        message: "Select any Certified Course",
        choices: certifiedCourses,
      },
    ]);

    const cer_courses_fees: { [key: string]: number } = {
      "Node.js Developer Certification": 30000,
      "AWS Fundamentals": 25000,
      "Ruby Fundamentals": 20000,
      "Modern JavaScript From The Beginning": 18000,
      "Java Programming Masterclass for Software Developers": 35000,
    };

    selectedCourse = cerCoursesAnswer.CertifiedCourse;
    selectedCourseFee = cer_courses_fees[selectedCourse];

    console.log(
      `\n The fee for ${chalk.green(selectedCourse)} is ${chalk.red(
        selectedCourseFee
      )} PKR \n`
    );
  }

  const paymenttype = await inquirer.prompt([
    {
      name: "paymentmethod",
      type: "list",
      message: "Select Payment method...",
      choices: ["Bank Transfer", "Easy Paisa","Jazz Cash", "Credit Card", "Debit Card"],
    },
    {
      name: "Amount_To_Pay",
      type: "input",
      message: "Enter Amount Of Selected Course",
      validate: (value) => {
        const numValue = parseFloat(value.trim());
        if (!isNaN(numValue) && numValue > 0) {
          return true;
        } else {
          return "Please Enter Valid Amount";
        }
      },
    },
  ]);

  console.log(
    `\n You Selected Payment Method As ${chalk.yellow(paymenttype.paymentmethod)} \n`
  );

  const payment = parseFloat(paymenttype.Amount_To_Pay);

  if (payment === selectedCourseFee) {
    console.log(`\n You Successfully Enrolled In ${chalk.green(selectedCourse)} \n`);

    let Student_Id = Math.floor(1000 + Math.random() * 9000);//generate 5 digit ID

    console.log(`Your ID is ${chalk.yellowBright(Student_Id)}`);

    const finalans = await inquirer.prompt([
      {
        name: "userChoice",
        type: "list",
        message: "What would you like to do now?",
        choices: ["View Status", "Exit"],
      },
    ]);

    if (finalans.userChoice === "View Status") {
      console.log("****STATUS****");
      console.log(`Student Name: ${chalk.green(answer.StudentName)}`);
      console.log(`Student ID: ${chalk.blue(Student_Id)}`);
      console.log(`Course: ${chalk.green(selectedCourse)}`);
      console.log(`Tuition Fees Paid: ${chalk.red(payment)}`);
    } else {
      console.log(chalk.red(" You Are Exited From SMS PORTAL"));
    }
  } else {
    console.log(chalk.red("Sorry, Your Amount Did Not Match With Course Fee"));
  }
};

runProgram();

//Author-Huma Mohsin.
