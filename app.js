const fs = require ('fs');
const inquirer = require('inquirer');
const manager  = require('./lib/manager');
const inter = require('./lib/inter');
const engineer = require('./lib/engineer');
const teamMemberArr = [];

const members = () => {
    const manager = () =>{
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
        const managerProfile = new manager(response.managerName, response.managerIDnumber,response.managerEmail,response.managerofficeNumber);
        teamMemberArr.push(managerProfile);
        addMember();
    

       })
    }
    const engineer = () =>{
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
    const intern = () =>{
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
                type: 'checkbox',
                name:'chooseMember',
                message: 'Which employee would you like to add: ',
                choices: ['Manager','Engineer','Intern','Done']

        }
    ]).then(response =>{
        const role = response.chooseMember;
        switch (role){
            case Manager:
                manager();
                break;
            case Engineer:
                engineer();
                break;
            case Intern:
                intern();
                break;
            case Done:
                teamReady();
                break;

        }
    });

    }
    addMember();
}
const teamReady = () =>{
    fs.writeFileSync('finish later')
}

