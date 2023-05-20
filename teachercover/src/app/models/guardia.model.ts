export class Guardia {
  horaGuardia: string
  fecha: Date;
  dia: string;
  hora: number;
  descripcion: string
  estado: string;
  idGuardia: number;
  aula: string;
  curso: string;
  nombreProfesor: string;
  profesor: number;
  idField: string;
  profesorCubierto: string;
  tipo: string;

  constructor(horaGuardia?: string, fecha?: Date, dia?: string, hora?: number, descripcion?: string, estado?: string, idGuardia?: number, aula?: string, curso?: string, nombreProfesor?: string, profesor?: number, idField?: string, profesorCubierto?:string, tipo?:string) {
    if (horaGuardia && dia && hora && descripcion && estado && idGuardia && aula && profesor && curso && nombreProfesor && fecha && idField && profesorCubierto&& tipo) {
      this.idGuardia = idGuardia
      this.estado = estado
      this.fecha = fecha;
      this.hora = hora
      this.horaGuardia = horaGuardia
      this.dia = dia
      this.descripcion = descripcion
      this.aula = aula
      this.profesor = profesor
      this.nombreProfesor = nombreProfesor
      this.curso = curso
      this.profesorCubierto = profesorCubierto
      this.tipo = tipo

    }
  }


  getTipo(){
    return this.tipo;
  }
  getProfesorCubierto(){
    return this.profesorCubierto;
  }
  getFecha(){
    return this.fecha;
  }
  getDia() {
    return this.dia
  }
  getIdField() {
    return this.idField;
  }
  getNombreProfesor() {
    return this.nombreProfesor
  }
  getProfesor() {
    return this.profesor
  }
  getCurso() {
    return this.curso
  }

  getAula() {
    return this.aula
  }
  getIdGuardia() {
    return this.idGuardia;
  }
  getHora() {
    return this.hora;
  }
  getDescripcion() {
    return this.descripcion;
  }
  getHoraGuardia() {
    return this.horaGuardia;
  }
  getEstado() {
    return this.estado;
  }

  setTipo(tipo:string){
    this.tipo = tipo;
  }
  setProfesorCubierto(profesorCubierto:string){
    this.profesorCubierto = profesorCubierto;
  }
  setIdField(idField: string) {
    this.idField = idField;
}
  setFecha(fecha: Date){
    this.fecha = fecha;
  }
  setDia(dia: string) {
    this.dia = dia
  }
  setProfesor(profesor: number) {
    this.profesor = profesor
  }
  setCurso(curso: string) {
    this.curso = curso
  }

  setNombreProfesor(nombreProfesor: string) {
    this.nombreProfesor = nombreProfesor
  }
  setAula(aula: string) {
    this.aula = aula
  }
  setIdGuardia(idGuardia: number) {
    this.idGuardia = idGuardia
  }
  setHora(hora: number) {
    this.hora = hora
  }
  setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }
  setHoraGuardia(horaGuardia: string) {
    this.horaGuardia = horaGuardia
  }
  setEstado(estado: string) {
    this.estado = estado
  }

}

