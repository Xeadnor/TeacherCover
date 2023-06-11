import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guardia } from 'app/models/guardia.model';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { GeneralService } from 'app/services/general.service';
import { GuardiaService } from 'app/services/guardia.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-editar-guardia',
  templateUrl: './editar-guardia.component.html',
  styleUrls: ['./editar-guardia.component.css']
})
export class EditarGuardiaComponent implements OnInit {
  guardiaEditandose : Guardia;
  createOnCallForm: FormGroup;
  rol: string;
  idGuardia: number;
  profesorCubierto: string;
  guardiaFecha: Date;
  diaGuardia: string;
  guardiaHora: number;
  horaGuardia: string;
  aulaGuardia: string;
  infoGuardia: string;
  cursoGuardia: string;
  letraCurso: string;
  nombreProfesor: string;
  profesor: number;
  idProfesorCubierto: number;
  tipo: string;
  faltaNombre: boolean;
  faltaAula: boolean;
  estado: string;
  profes: Profesor[] = [];
  aulas: string[] = [];
  letras: string[] = []
  private sub: any;
  nombresProfes = this.profes;
  aulasFiltradas = this.aulas;
  mostrados:boolean;
  constructor( private dateAdapter: DateAdapter<Date>,private route: ActivatedRoute,private router: Router,private generalService: GeneralService, private guardiaService: GuardiaService, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) {     this.dateAdapter.setLocale('es');
  this.dateAdapter.getFirstDayOfWeek()};
  
  
  ngOnInit() {
    this.createOnCallForm = new FormGroup({
      profesorCubierto: new FormControl("", Validators.required),
      guardiaFecha: new FormControl("", Validators.required),
      guardiaHora: new FormControl("", Validators.required),
      aulaGuardia: new FormControl("", Validators.required),
      infoGuardia: new FormControl(),
      cursoGuardia: new FormControl("", Validators.required),
      letraCurso:new FormControl("", Validators.required),
      incidencia:new FormControl("", Validators.required)
    }, { updateOn: "submit" });

    this.mostrados = true;
    this.faltaNombre = false;
    this.profesorService.getProfesors().subscribe(profesores => {
      this.profes.splice(0)
      profesores.forEach((profesor) => {
        if (profesor["role"] != "Admin") {
          this.profes.push(profesor);

        }

      })
    });
    this.generalService.getAulas().subscribe(aulas => {
      this.aulas.splice(0)
      aulas.forEach((aula) => {
   
        this.aulas.push(aula["nombre"]);

      })
      this.aulas.sort();
    });
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.rol = profesor["role"]
    this.guardiaEditandose = new Guardia() ;
    this.sub = this.route.params.subscribe(params => {
       let idGuardia = params['idGuardia']; 
       this.guardiaService.getAGuardiaFromId(idGuardia).then((value) =>{
        this.guardiaEditandose.setIdField(idGuardia);
      this.guardiaEditandose.setProfesorCubierto(value!["profesorCubierto"]);
      this.guardiaEditandose.setAula(value!["aula"]);
      this.guardiaEditandose.setDescripcion(value!["descripcion"]);
      this.guardiaEditandose.setDia(value!["dia"]);
      this.guardiaEditandose.setEstado(value!["estado"]);
      this.guardiaEditandose.setFecha(value!["fecha"]);
      this.guardiaEditandose.setHora(value!["hora"]);
      this.guardiaEditandose.setCurso(value!["curso"]);
      this.guardiaEditandose.setHoraGuardia(value!["horaGuardia"]);
      this.guardiaEditandose.setIdGuardia(value!["idGuardia"]);
      this.guardiaEditandose.setIncidencia(value!["incidencia"]);
      this.guardiaEditandose.setIncidenciaTexto(value!["incidenciaTexto"]);
      this.guardiaEditandose.setNombreProfesor(value!["nombreProfesor"]);
      this.guardiaEditandose.setProfesor(value!["profesor"]);
      this.guardiaEditandose.setTipo(value!["tipo"]);
      this.guardiaEditandose.setIdProfesorCubierto(value!["idProfesorCubierto"])
        this.nombreProfesor = value!["profesorCubierto"];



      if (this.rol == "Admin" && this.guardiaEditandose.getEstado() == "Finalizada") {
        let fecha = this.guardiaEditandose.getFecha().toString().replaceAll("/","-");

        let  prueba = this.guardiaEditandose.getCurso().split("-");

        let letra = prueba[prueba.length-1].trim()
        let numCurso = ""
     
        
        if(prueba.length > 2){
         numCurso  = prueba[0].charAt(0) + prueba[1].trim()

        }else{
         if(prueba[0].length == 6){
           numCurso = prueba[0].charAt(0)
         }else if(prueba[0].length == 12){
          if(prueba[0].charAt(prueba[0].length -1) ==  "r"){
            numCurso = prueba[0].charAt(0) + "B"
          }else{
           numCurso = prueba[0].charAt(0) + "FPB"

          }
         }
        }
       
        this.changeCursoGuardiaInicio(numCurso);

  
        this.createOnCallForm = new FormGroup({
          profesorCubierto: new FormControl({value:this.guardiaEditandose.getIdProfesorCubierto(),disabled:true}, Validators.required),
          guardiaFecha: new FormControl({value:fecha,disabled:true}, Validators.required),
          guardiaHora: new FormControl({value:this.guardiaEditandose.getHora(),disabled:true}, Validators.required),
          aulaGuardia: new FormControl({value:this.guardiaEditandose.getAula(),disabled:true}, Validators.required),
          infoGuardia: new FormControl({value:this.guardiaEditandose.getDescripcion(), disabled:true}),
          cursoGuardia: new FormControl({value:numCurso,disabled:true}, Validators.required),
          letraCurso:new FormControl({value:letra,disabled:true}, Validators.required),
      incidencia:new FormControl({value:this.guardiaEditandose.getIncidenciaTexto(),disabled:true}, Validators.required)

        }, { updateOn: "submit" });
    
        }else if(this.rol == "Admin" && this.guardiaEditandose.getEstado() == "Pendiente"){
          let fecha = this.guardiaEditandose.getFecha().toString().replaceAll("/","-");

         let  prueba = this.guardiaEditandose.getCurso().split("-");

         let letra = prueba[prueba.length-1].trim()
         let numCurso = ""
         if(prueba.length > 2){
          numCurso  = prueba[0].charAt(0) + prueba[1].trim()

         }else{
          
         if(prueba[0].length == 6){
          numCurso = prueba[0].charAt(0)
        }else if(prueba[0].length == 12){
         if(prueba[0].charAt(prueba[0].length -1) ==  "r"){
           numCurso = prueba[0].charAt(0) + "B"
         }else{
          numCurso = prueba[0].charAt(0) + "FPB"

         }
        }
         }

          this.changeCursoGuardiaInicio(numCurso);
          this.createOnCallForm = new FormGroup({
            profesorCubierto: new FormControl(this.guardiaEditandose.getIdProfesorCubierto(), Validators.required),
            guardiaFecha: new FormControl(fecha, Validators.required),
            guardiaHora: new FormControl(this.guardiaEditandose.getHora(), Validators.required),
            aulaGuardia: new FormControl(this.guardiaEditandose.getAula(), Validators.required),
            infoGuardia: new FormControl(this.guardiaEditandose.getDescripcion()),
            cursoGuardia: new FormControl(numCurso, Validators.required),
            letraCurso:new FormControl(letra, Validators.required),
      incidencia:new FormControl({value:this.guardiaEditandose.getIncidenciaTexto(),disabled:true}, Validators.required)

          }, { updateOn: "submit" });
    
        }else{
          let fecha = this.guardiaEditandose.getFecha().toString().replaceAll("/","-");

          let  prueba = this.guardiaEditandose.getCurso().split("-");
 
          let letra = prueba[prueba.length-1].trim()
          let numCurso = ""
          if(prueba.length > 2){
           numCurso  = prueba[0].charAt(0) + prueba[1].trim()
 
          }else{
          
         if(prueba[0].length == 6){
          numCurso = prueba[0].charAt(0)
        }else if(prueba[0].length == 12){
         if(prueba[0].charAt(prueba[0].length-1) ==  "r"){
           numCurso = prueba[0].charAt(0) + "B"
         }else{
          numCurso = prueba[0].charAt(0) + "FPB"

         }
        }
          }
 
           
           this.changeCursoGuardiaInicio(numCurso);
           this.createOnCallForm = new FormGroup({
            profesorCubierto: new FormControl({value:this.guardiaEditandose.getIdProfesorCubierto(),disabled:true}, Validators.required),
            guardiaFecha: new FormControl({value:fecha,disabled:true}, Validators.required),
            guardiaHora: new FormControl({value:this.guardiaEditandose.getHora(),disabled:true}, Validators.required),
            aulaGuardia: new FormControl({value:this.guardiaEditandose.getAula(),disabled:true}, Validators.required),
            infoGuardia: new FormControl({value:this.guardiaEditandose.getDescripcion(), disabled:true}),
            cursoGuardia: new FormControl({value:numCurso,disabled:true}, Validators.required),
            letraCurso:new FormControl({value:letra,disabled:true}, Validators.required),
        incidencia:new FormControl(this.guardiaEditandose.getIncidenciaTexto(), Validators.required)
 
           }, { updateOn: "submit" });
        }
      
        });
    });

  





    

  }




  changeHoraGuardia(e: any) {
    this.guardiaHora = e.target.value
  }
  onKey(e: any) {
    this.nombresProfes = this.search(e.target.value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    return this.profes.filter(option =>
      option.name.toLowerCase().startsWith(filter)
    );
  }

  onKeyAula(e: any) {
    this.aulasFiltradas = this.searchAula(e.target.value);
  }
  searchAula(value: string) {
    let filter = value.toLowerCase();
    return this.aulas.filter(option =>
      option.toLowerCase().startsWith(filter)
    );
  }

  changeCursoGuardia(e: any) {
    this.cursoGuardia = e.target.value
  
    this.letras.splice(0);
    if (this.cursoGuardia == "1" || this.cursoGuardia == "2" ||
      this.cursoGuardia == "3" || this.cursoGuardia == "4" ||
      this.cursoGuardia == "1B" || this.cursoGuardia == "2B") {
      this.letras.push("A")
      this.letras.push("B")
      this.letras.push("C")
      this.letras.push("D")


    } else {
      this.letras.push("Dual")
      this.letras.push("Diurno")
      this.letras.push("Vespertino")
      this.letras.push("Curso línea única")


    }

  }
  changeCursoGuardiaInicio(e: string) {
    this.cursoGuardia = e
  
    this.letras.splice(0);
    if (this.cursoGuardia == "1" || this.cursoGuardia == "2" ||
      this.cursoGuardia == "3" || this.cursoGuardia == "4" ||
      this.cursoGuardia == "1B" || this.cursoGuardia == "2B") {
      this.letras.push("A")
      this.letras.push("B")
      this.letras.push("C")
      this.letras.push("D")


    } else {
      this.letras.push("Dual")
      this.letras.push("Diurno")
      this.letras.push("Vespertino")
      this.letras.push("Curso línea única")


    }

  }
  changeNombreProfe(e: any) {
    this.idProfesorCubierto = e.value;
    for(let profe of this.profes){
      if(e.value == profe.id){
        this.nombreProfesor = profe.name;

      }
    }
  }
  changeAula(e: any) {

    this.aulaGuardia = e.value
  }

  changeLetraCurso(e: any) {
    this.letraCurso = e.target.value
  }

  obtenerTextoHora(hora: string): string {
    let texto = ""
    switch (hora) {
      case "8":
        texto = "Primera hora"
        break;
      case "9":
        texto = "Segunda hora"
        break;
      case "10":
        texto = "Tercera hora"
        break;
      case "11":
        texto = "Recreo"
        break;
      case "12":
        texto = "Cuarta hora"
        break;
      case "13":
        texto = "Quinta hora"
        break;
      case "14":
        texto = "Sexta hora"
        break;
      default:
        break;
    }
    return texto;
  }

  obtenerTextoCurso(curso: string): string {
    let texto = ""
    switch (curso) {
      case "1":
        texto = "1º ESO-"
        break;
      case "2":
        texto = "2º ESO-"
        break;
      case "3":
        texto = "3º ESO-"
        break;
      case "4":
        texto = "4º ESO-"
        break;
      case "1B":
        texto = "1º Bachiller-"
        break;
      case "2B":
        texto = "2º Bachiller-"
        break;
      case "1FPB":
        texto = "1º FP Básica-"
        break;
      case "2FPB":
        texto = "2º FP Básica-"
        break;
      case "1SMR":
        texto = "1º FPGM - SMR-"
        break;
      case "2SMR":
        texto = "2º FPGM - SMR-"
        break;
      case "1TEGU":
        texto = "1º FPGM - TEGU-"
        break;
      case "2TEGU":
        texto = "2º FPGM - TEGU-"
        break;
      case "1DAW":
        texto = "1º FPGS - DAW-"
        break;
      case "2DAW":
        texto = "2º FPGS - DAW-"
        break;
      case "1DAM":
        texto = "1º FPGS - DAM-"
        break;
      case "2DAM":
        texto = "2º FPGS - DAM-"
        break;
      case "1TSEAS":
        texto = "1º FPGS - TSEAS-"
        break;
      case "2TSEAS":
        texto = "2º FPGS - TSEAS-"
        break;
      default:
        break;
    }
    return texto;
  }

  obtenerTextoLetra(letra: string): string {
    let texto = ""
    switch (letra) {
      case "A":
      case "B":
      case "C":
      case "D":
        texto = letra
        break;
      case "Dual":
        texto = "Dual"
        break;
      case "Diurno":
        texto = "Diurno"
        break;
      case "Vespertino":
        texto = "Vespertino"
        break;
      case "Curso línea única":
        texto = "Curso línea única"
        break;
      default:
        break;
    }
    return texto;
  }

  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = fecha.getDay();
    return diasSemana[indiceDia];
  }
  getMonthofToday(mes: number) {
    let numeroMes = mes + 1;
    let devolverMes;
    if (numeroMes < 10) {
      devolverMes = "0" + numeroMes;
    } else {
      devolverMes = numeroMes;
    }

    return devolverMes;
  }
  getDayofToday(dia: number) {
    let devolverDia;
    if (dia < 10) {
      devolverDia = "0" + dia;
    } else {
      devolverDia = dia;
    }

    return devolverDia;
  }

  refrescarFormulario() {

  }



  async createOnCall() {
   
    if(this.rol == "Admin" && this.guardiaEditandose.estado != "Finalizada"){
      let dateSelectedMilisec = this.createOnCallForm.get("guardiaFecha")?.value;
      const fecha = new Date(dateSelectedMilisec);
      let dia = fecha.getFullYear() + "/" + this.getMonthofToday(fecha.getMonth()) + "/" + this.getDayofToday(fecha.getDate());

      this.guardiaEditandose.setProfesorCubierto(this.nombreProfesor);
    this.guardiaEditandose.setAula( this.createOnCallForm.controls["aulaGuardia"].value);
     this.guardiaEditandose.setHora( this.createOnCallForm.controls["guardiaHora"].value);
     this.guardiaEditandose.setDescripcion( this.createOnCallForm.controls["infoGuardia"].value);
      this.guardiaEditandose.setCurso(this.obtenerTextoCurso(this.createOnCallForm.controls["cursoGuardia"].value) + "" + this.obtenerTextoLetra(this.createOnCallForm.controls["letraCurso"].value));
      this.guardiaEditandose.setIdProfesorCubierto(this.createOnCallForm.controls["profesorCubierto"].value);
      this.guardiaEditandose.setHoraGuardia(this.obtenerTextoHora(this.guardiaEditandose.getHora().toString()));
      this.guardiaEditandose.setDia(this.obtenerDiaSemana(fecha));
      this.guardiaService.updateGuardia(this.guardiaEditandose,dia);

      this.router.navigate(["../pagina/historial"]);
  this.toastr.success("Se ha actualizado con exito la guardia : " + this.guardiaEditandose.getIdGuardia(),"Guardia editada",{timeOut:3000,closeButton:true,positionClass:"toast-top-right"})
}else if(this.rol == "Admin" && this.guardiaEditandose.estado == "Finalizada"){
  this.router.navigate(["../pagina/historial"]);
  this.toastr.info("No se ha modificado ningun dato.","Guardia",{timeOut:3000,closeButton:true,positionClass:"toast-top-right"})
    }else{
      if(this.createOnCallForm.controls["incidencia"].value != "Sin incidencia"){
        let dateSelectedMilisec = this.createOnCallForm.get("guardiaFecha")?.value;
        const fecha = new Date(dateSelectedMilisec);
        let dia = fecha.getFullYear() + "/" + this.getMonthofToday(fecha.getMonth()) + "/" + this.getDayofToday(fecha.getDate());
  
      this.guardiaEditandose.setIncidenciaTexto(this.createOnCallForm.controls["incidencia"].value); 
  
      this.guardiaEditandose.setIncidencia(true);
       this.guardiaService.updateGuardia(this.guardiaEditandose,dia);
       this.toastr.success("Se ha actualizado la incidencia de la guardia : " + this.guardiaEditandose.getIdGuardia(),"Guardia editada",{timeOut:3000,closeButton:true,positionClass:"toast-top-right"})
       this.router.navigate(["../pagina/historial"]);
       
      }else{
  this.toastr.info("No se ha modificado ningun dato.","Guardia",{timeOut:3000,closeButton:true,positionClass:"toast-top-right"})
  this.router.navigate(["../pagina/historial"]);

      }
   
    }



    }









}
