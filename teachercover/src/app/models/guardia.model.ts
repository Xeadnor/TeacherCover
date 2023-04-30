export class Guardia {
  diaSemana: number
  hora: number;
  descripcion: string
  estado: string;
  idGuardia: number;
  aula: string;
  curso: string;
  profesor: number;

  constructor(diaSemana?: number, hora?: number, descripcion?: string, estado?: string, idGuardia?: number, aula?: string, curso?: string, profesor?: number) {
    if (diaSemana && hora && descripcion && estado && idGuardia && aula && profesor && curso) {
      this.idGuardia = idGuardia
      this.estado = estado
      this.hora = hora
      this.diaSemana = diaSemana
      this.descripcion = descripcion
      this.aula = aula
      this.profesor = profesor
      this.curso = curso
    }
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
  getDiaSemana() {
    return this.diaSemana;
  }
  getEstado() {
    return this.estado;
  }


  setProfesor(profesor:number){
    this.profesor = profesor
  }
  setCurso(curso:string){
    this.curso = curso
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
  setDiaSemana(diaSemana: number) {
    this.diaSemana = diaSemana
  }
  setEstado(estado: string) {
    this.estado = estado
  }

}

