export class Profesor {
    id: number;
    name: string;
    email: string;
    horasGuardias: number
    role: string
    validate: number
    idField: string
    horarioGuardias: Map<string, number>
    horarioGuardiasApoyo: Map<string, number>
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
        return this.id;
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


    setHorarioGuardia(horarioGuardias: Map<string, number>) {
        this.horarioGuardias = horarioGuardias
    }
    setHorarioGuardiaApoyo(horarioGuardiasApoyo: Map<string, number>) {
        this.horarioGuardiasApoyo = horarioGuardiasApoyo
    }
    setName(name: string) {
        this.name = name;
    }
    setIdProfesor(Id: number) {
        this.id = Id;
    }
    setHorasGuardias(horasGuardias: number) {
        this.horasGuardias = horasGuardias;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setRole(Role: string) {
        this.role = Role;
    }
    setValidate(validate: number) {
        this.validate = validate;
    }
    setIdField(idField: string) {
        this.idField = idField;
    }
}
