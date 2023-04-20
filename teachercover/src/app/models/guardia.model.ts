export class Guardia {
    diaSemana: number
    hora: number;
    descripcion: string
    estado: string;
    idGuardia: number;

  constructor(diaSemana?:number,hora?:number,descripcion?:string,estado?:string,idGuardia?:number){
    if(diaSemana && hora && descripcion && estado && idGuardia){
      this.idGuardia = idGuardia
      this.estado = estado
      this.hora = hora
      this.diaSemana = diaSemana
      this.descripcion = descripcion
    }
  }

    
    getIdGuardia(){
      return this.idGuardia;
    }
    getHora(){
      return this.hora;
    }
    getDescripcion(){
      return this.descripcion;
    }
    getDiaSemana(){
      return this.diaSemana;
    }
    getEstado(){
      return this.estado;
    }


    setIdGuardia(idGuardia : number){
       this.idGuardia = idGuardia
    }
    setHora( hora : number){
       this.hora = hora
    }
    setDescripcion( descripcion : string){
       this.descripcion = descripcion;
    }
    setDiaSemana( diaSemana : number){
       this.diaSemana = diaSemana
    }
    setEstado( estado : string){
       this.estado = estado
    }

  }

  