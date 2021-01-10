const Employee = require("./Employee")

// Constructor for the Subclass Intern, an extension of Employee

class Intern extends Employee {
    constructor (name, id, email, school) {
        super( name, id, email)
        this.school = school;
    }
    getSchool() {
        return this.school
    };
    getRole() {
        return "Intern"
    };
}

module.exports = Intern