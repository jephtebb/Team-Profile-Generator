class intern {
    constructor(name, id, email, school){
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
    }
    internName(){
        return this.name;
    }

    internId(){
        return this.id;
    }

    internEmail(){
        return this.email;
    }

    internSchool(){
        return this.school;
    }
}

module.exports = intern;