export class Profesor {
    idProfesor: Number;
    name:String;
    password: String;



    constructor(name: String, password : String){
        this.idProfesor = 1;
        this.name = name;
        this.password = password;
    }

    getIdProfesor(){
        return this.idProfesor;
    }
    getName(){
        return this.name;
    }

    getPassword(){
        return this.password;
    }
}
