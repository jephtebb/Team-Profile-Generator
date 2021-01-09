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
    const managerP = () =>{
        inquirer.prompt([
         {
                type: 'input',
                name: 'managerName',
                message: "What is the manager's name"
        },
        {
                type: 'input',
                name: 'managerIDnumber',
                message: "What is the manager's ID number"
        },
        {
                type: 'input',
                name: 'managerEmail',
                message: "What is the manager's email address"
        },
        {
                type: 'input',
                name: 'managerOfficeNumber',
                message: "What is the manager's office number"
        }

    ]).then(response => {
        const managerProfile = new manager(response.managerName, response.managerIDnumber,response.managerEmail,response.managerOfficeNumber);
        console.log(response.managerName)
        teamMemberArr.push(managerProfile);
        addMember();
       })
    }
    const engineerP = () =>{
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is the engineer's name"
        },
        {
                type: 'input',
                name: 'engineerIDnumber',
                message: "What is the engineer's ID number"
        },
        {
                type: 'input',
                name: 'engineerEmail',
                message: "What is the engineer's email address"
        },
        {
                type: 'input',
                name: 'githubUsername',
                message: "What is the engineer's github username"
        }

    ]).then(response => {
        const engineerProfile = new engineer(response.engineerName, response.engineerIDnumber,response.engineerEmail,response.githubUsername);
        teamMemberArr.push(engineerProfile);
        addMember();
       })
    }
    const internP = () =>{
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: "What is the intern's name"
        },
        {
                type: 'input',
                name: 'internIDnumber',
                message: "What is the intern's ID number"
        },
        {
                type: 'input',
                name: 'internEmail',
                message: "What is the intern's email address"
        },
        {
                type: 'input',
                name: 'schoolAttended',
                message: "Where does the intern go to school?"
        }

    ]).then(response => {
        const internProfile = new intern(response.internName, response.internIDnumber,response.internEmail,response.schoolAttended);
        teamMemberArr.push(internProfile);
        addMember();
       })
    }
    const addMember = () =>{
        inquirer.prompt([
            {
                type: 'list',
                name:'chooseMember',
                message: 'Which employee would you like to add or select "done" to build your team: ',
                choices: ['Manager','Engineer','Intern','Done']
        }
    ]).then(response =>{
        const choice = response.chooseMember;
        console.log(choice)
        if (choice === "Manager"){
            managerP();
        }
        else if (choice === "Engineer"){
            engineerP();
        }
        else if (choice === "Intern"){
            internP();
        }
        else {
            teamReady();
        }
    });

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

