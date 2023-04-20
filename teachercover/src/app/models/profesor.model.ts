export class Profesor {
    idProfesor: Number;
    name: String;
    password: String;
    email: String;
    diaGuardia: String;
    horasGuardias: Number



    constructor() {
    }

    getIdProfesor() {
        return this.idProfesor;
    }
    getName() {
        return this.name;
    }
    getPassword() {
        return this.password;
    }
    getdiaGuardias() {
        return this.diaGuardia;
    }
    gethorasGuardias() {
        return this.horasGuardias;
    }
    getEmail() {
        return this.email;
    }

    setName(name: String) {
        this.name = name;
    }
    setPassword(password: String) {
        this.password = password;
    }
    setIdProfesor(Id: Number) {
        this.idProfesor = Id;
    }
    setHorasGuardais(horasGuardias: Number) {
        this.horasGuardias = horasGuardias;
    }
    setEmail(email: String) {
        this.email = email;
    }
    setDiaGuardia(diaGuardia: String) {
        this.diaGuardia = diaGuardia;
    }
}
