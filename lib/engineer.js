class engineer {
    constructor(name, id, email, github){
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
    }
    engineerName(){
        return this.name;
    }

    engineerId(){
        return this.id;
    }

    engineerEmail(){
        return this.email;
    }

    engineerGithub(){
        return this.github;
    }
}

module.exports = engineer;