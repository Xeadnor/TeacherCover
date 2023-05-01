export class Profesor {
    idProfesor: Number;
    name: String;
    email: String;
    horasGuardias: Number
    role: String
    validate: Number
    idField: String
    horarioGuardias: Map<String, Number>
    horarioGuardiasApoyo: Map<String, Number>
    constructor() {
    }

    getHorarioGuardias() {
        return this.horarioGuardias;
    }
    getHorarioGuardiasApoyo() {
        return this.horarioGuardiasApoyo;
    }
    getIdField() {
        return this.idField;
    }
    getIdProfesor() {
        return this.idProfesor;
    }
    getRole() {
        return this.role;
    }
    getValidate() {
        return this.validate;
    }
    getName() {
        return this.name;
    }
    gethorasGuardias() {
        return this.horasGuardias;
    }
    getEmail() {
        return this.email;
    }


    setHorarioGuardia(horarioGuardias: Map<String, Number>) {
        this.horarioGuardias = horarioGuardias
    }
    setHorarioGuardiaApoyo(horarioGuardiasApoyo: Map<String, Number>) {
        this.horarioGuardiasApoyo = horarioGuardiasApoyo
    }
    setName(name: String) {
        this.name = name;
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
    setRole(Role: String) {
        this.role = Role;
    }
    setValidate(validate: Number) {
        this.validate = validate;
    }
    setIdField(idField: String) {
        this.idField = idField;
    }
}
