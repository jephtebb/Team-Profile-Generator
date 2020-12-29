class manager {
    constructor(name, id, email, officeNumber){
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeNumber = officeNumber;
    }
    managerName(){
        return this.name;
    }

    managerId(){
        return this.id;
    }

    managerEmail(){
        return this.email;
    }

    managerOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = manager;