const fs = require ('fs');
const inquirer = require('inquirer');
const manager  = require('./lib/manager');
const intern = require('./lib/intern');
const engineer = require('./lib/engineer');
const path = require('path');
const render = require("./lib/htmlpage");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "index.html");

const teamMemberArr = [];
const members = () => {
    const managerP = (employeeAnswer) =>{
        inquirer.prompt([
        {
                type: 'input',
                name: 'managerOfficeNumber',
                message: "What is the manager's office number"
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "answerAddAnother",
        }

    ]).then(response => {
    const managerProfile = new manager(employeeAnswer.employeeName, employeeAnswer.employeeID, employeeAnswer.employeeEmail, response.managerOfficeNumber);
    teamMemberArr.push(managerProfile);
    if (response.answerAddAnother === true) {

        // This loops back to the original function to add another employee if the user so chooses
        addMember()
    } else {

        // This begins the process of rendering the content if there is nobody else to add
        teamReady();
      
    }
})
    }
    const engineerP = (employeeAnswer) =>{
        inquirer.prompt([
        {
                type: 'input',
                name: 'githubUsername',
                message: "What is the engineer's github username"
        },
        {
            type: "confirm",
            message: "Would you like to add another team member?",
            name: "answerAddAnother",
        },

    ]).then(response => {
        const engineerProfile = new engineer(employeeAnswer.employeeName, employeeAnswer.employeeID, employeeAnswer.employeeEmail, response.githubUsername);
        teamMemberArr.push(engineerProfile);
        if (response.answerAddAnother === true) {
    
            // This loops back to the original function to add another employee if the user so chooses
            addMember()
        } else {
    
            // This begins the process of rendering the content if there is nobody else to add
            teamReady();
            
        }
    })
    }
    const internP = (employeeAnswer) =>{
        inquirer.prompt([
        {
                type: 'input',
                name: 'schoolAttended',
                message: "Where does the intern go to school?"
        },
        {
            type: "confirm",
            message: " Would you like to add another team member?",
            name: "answerAddAnother",
        },

    ]).then(response => {
        const internProfile = new intern(employeeAnswer.employeeName, employeeAnswer.employeeID, employeeAnswer.employeeEmail, response.schoolAttended);
        teamMemberArr.push(internProfile);
        if (response.answerAddAnother === true) {
    
            // This loops back to the original function to add another employee if the user so chooses
            addMember()
        } else {
    
            // This begins the process of rendering the content if there is nobody else to add
            teamReady();
           
        }
    })
    }
    const addMember = () =>{
        inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the team member you would like to add: ",
            name: "employeeName"
        },
        {
            type: "input",
            message: "Enter his or her ID number: ",
            name: "employeeID"
        },
        {
            type: "input",
            message: "Great.  What is his or her e-mail address?",
            name: "employeeEmail"
        },
        {
                type: 'list',
                name:'chooseMember',
                message: 'Select the role of the employee: ',
                choices: ['Manager','Engineer','Intern']
        }
    ]).then(response =>{
            // Determining the next line of questions to be answered, based off of which role the employee will have
            if (response.chooseMember === "Engineer") {
                engineerP(response);
            } else if (response.chooseMember === "Intern") {
                internP(response);
            } else {
                managerP(response);
            }
        })

    }
    addMember();
}
const teamReady = () =>{
    if (!fs.existsSync(OUTPUT_DIR)) {
        console.log(fs.mkdirSync(OUTPUT_DIR))
    }
    fs.writeFileSync(outputPath, render(teamMemberArr), "utf-8");
    }

members();

