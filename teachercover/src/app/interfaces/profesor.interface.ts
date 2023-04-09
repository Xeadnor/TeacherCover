export class Profesor {
    idProfesor: Number;
    name:String;
    password: String;



    constructor(){
    }

    getIdProfesor(){
        return this.idProfesor;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.idProfesor;
    }

    setName(name : String){
        this.name = name;
    }
    setPassword(password : String){
        this.password = password;
    }
    setId(Id : Number){
        this.idProfesor = Id;
    }

    getPassword(){
        return this.password;
    }
}
