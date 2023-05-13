import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit, OnDestroy {
  emailAdmin: String;
  editTeacherForm: FormGroup;
  rol: String;
  guardiaLunes: number;
  guardiaMartes: number;
  guardiaMiercoles: number;
  guardiaJueves: number;
  guardiaViernes: number;
  guardiaLunesApoyo: number;
  guardiaMartesApoyo: number;
  guardiaMiercolesApoyo: number;
  guardiaJuevesApoyo: number;
  guardiaViernesApoyo: number;
  registro: boolean;
  id: string;
  private sub: any;
  profesor: Profesor;
  constructor(private route: ActivatedRoute,private router: Router, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };

  @ViewChild('f') f: NgForm
  ngOnInit() {
    this.registro = false;
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.emailAdmin = profesor["email"]
    this.rol = profesor["role"]
    if (this.rol != "Admin") {
      this.router.navigate(["/pagina/calendario"]);
    }

    this.editTeacherForm = new FormGroup({
      nombreProf: new FormControl("", Validators.required),
      horasGuardias: new FormControl("", Validators.required),
      lunesGuardia: new FormControl("", Validators.required),
      martesGuardia: new FormControl("", Validators.required),
      miercolesGuardia: new FormControl("", Validators.required),
      juevesGuardia: new FormControl("", Validators.required),
      viernesGuardia: new FormControl("", Validators.required),
      lunesGuardiaApoyo: new FormControl("", Validators.required),
      martesGuardiaApoyo: new FormControl("", Validators.required),
      miercolesGuardiaApoyo: new FormControl("", Validators.required),
      juevesGuardiaApoyo: new FormControl("", Validators.required),
      viernesGuardiaApoyo: new FormControl("", Validators.required),

    }, { updateOn: "submit" });
    
    this.profesor = new Profesor() ;
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id']; 
       this.profesorService.getATeacherFromId(this.id).then((value) =>{
        this.profesor.setEmail(value!["email"]);
        this.profesor.setHorarioGuardia(value!["horarioGuardias"])
        this.profesor.setHorarioGuardiaApoyo(value!["horarioGuardiasApoyo"])
        this.profesor.setHorasGuardias(value!["horasGuardias"])
        this.profesor.setIdField(this.id)
        this.profesor.setIdProfesor(value!["id"])
        this.profesor.setName(value!["name"])
        this.profesor.setRole(value!["role"])
        this.profesor.setValidate(value!["validate"])


        this.editTeacherForm.controls["nombreProf"].setValue(this.profesor.getName());
        this.editTeacherForm.controls["horasGuardias"].setValue(this.profesor.gethorasGuardias());


        this.editTeacherForm.controls["lunesGuardia"].setValue(value!["horarioGuardias"]["lunes"]);
        this.guardiaLunes = value!["horarioGuardias"]["lunes"];
        this.editTeacherForm.controls["martesGuardia"].setValue(value!["horarioGuardias"]["martes"]);
        this.guardiaMartes = value!["horarioGuardias"]["martes"];
        this.editTeacherForm.controls["miercolesGuardia"].setValue(value!["horarioGuardias"]["miercoles"]);
        this.guardiaMiercoles = value!["horarioGuardias"]["miercoles"];
        this.editTeacherForm.controls["juevesGuardia"].setValue(value!["horarioGuardias"]["jueves"]);
        this.guardiaJueves = value!["horarioGuardias"]["jueves"];
        this.editTeacherForm.controls["viernesGuardia"].setValue(value!["horarioGuardias"]["viernes"]);
        this.guardiaViernes = value!["horarioGuardias"]["viernes"];

        this.editTeacherForm.controls["lunesGuardiaApoyo"].setValue(value!["horarioGuardiasApoyo"]["lunes"]);
        this.guardiaLunesApoyo = value!["horarioGuardiasApoyo"]["lunes"];
        this.editTeacherForm.controls["martesGuardiaApoyo"].setValue(value!["horarioGuardiasApoyo"]["martes"]);
        this.guardiaMartesApoyo = value!["horarioGuardiasApoyo"]["martes"];
        this.editTeacherForm.controls["miercolesGuardiaApoyo"].setValue(value!["horarioGuardiasApoyo"]["miercoles"]);
        this.guardiaMiercolesApoyo = value!["horarioGuardiasApoyo"]["miercoles"];
        this.editTeacherForm.controls["juevesGuardiaApoyo"].setValue(value!["horarioGuardiasApoyo"]["jueves"]);
        this.guardiaJuevesApoyo = value!["horarioGuardiasApoyo"]["jueves"];
        this.editTeacherForm.controls["viernesGuardiaApoyo"].setValue(value!["horarioGuardiasApoyo"]["viernes"]);
        this.guardiaViernesApoyo = value!["horarioGuardiasApoyo"]["viernes"];

       }) 
    });
    console.log(this.profesor);
  }
  changehorasGuardias(e:any){
    if(e.target.value < 0){
      this.editTeacherForm.controls["horasGuardias"].setValue(0);

    }
  }
  changeLunesGuardia(e: any) {
    this.guardiaLunes = e.target.value
  }
  changeMartesGuardia(e: any) {
    this.guardiaMartes = e.target.value
  }
  changeMiercolesGuardia(e: any) {
    this.guardiaMiercoles = e.target.value
  }
  changeJuevesGuardia(e: any) {
    this.guardiaJueves = e.target.value
  }
  changeViernesGuardia(e: any) {
    this.guardiaViernes = e.target.value
  }

  changeLunesGuardiaApoyo(e: any) {
    this.guardiaLunesApoyo = e.target.value
  }
  changeMartesGuardiaApoyo(e: any) {
    this.guardiaMartesApoyo = e.target.value
  }
  changeMiercolesGuardiaApoyo(e: any) {
    this.guardiaMiercolesApoyo = e.target.value
  }
  changeJuevesGuardiaApoyo(e: any) {
    this.guardiaJuevesApoyo = e.target.value
  }
  changeViernesGuardiaApoyo(e: any) {
    this.guardiaViernesApoyo = e.target.value
  }

  updateTeacher(){
    let nombreProfe = this.editTeacherForm.controls["nombreProf"].value;
    let horasGuardias = this.editTeacherForm.controls["horasGuardias"].value;

    if (nombreProfe.length > 0 && horasGuardias.toString().length > 0) {
        let horarioGuardia = new Map<string, number>([
          ["lunes", this.guardiaLunes],
          ["martes", this.guardiaMartes],
          ["miercoles", this.guardiaMiercoles],
          ["jueves", this.guardiaJueves],
          ["viernes", this.guardiaViernes],
        ]);
        let horasGuardiaApoyo = new Map<string, number>([
          ["lunes", this.guardiaLunesApoyo],
          ["martes", this.guardiaMartesApoyo],
          ["miercoles", this.guardiaMiercolesApoyo],
          ["jueves", this.guardiaJuevesApoyo],
          ["viernes", this.guardiaViernesApoyo],
        ]);
              this.profesor.setName(nombreProfe);
              this.profesor.setHorasGuardias(horasGuardias);
              this.profesor.setHorarioGuardia(horarioGuardia);
              this.profesor.setHorarioGuardiaApoyo(horasGuardiaApoyo);
              console.log(this.profesor);

              this.profesorService.updateTeacher(this.profesor);
              if(this.emailAdmin == this.profesor.getEmail()){
                sessionStorage.clear();
                sessionStorage.setItem('profesor', JSON.stringify(this.profesor))
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['./'],{relativeTo: this.route})

              }
              this.toastr.success("Se han guardado con éxito los nuevos datos del profesor", "Profesor creado", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
              this.router.navigate(["../pagina/historialProfesores"]);
        
      }  else {
      //campos obligatorios
      this.toastr.error("Se han de rellenar todos los campos", "Campos vacíos", { timeOut: 3000, closeButton: true, positionClass: "toast-top-right" })
    }


}
ngOnDestroy() {
  this.sub.unsubscribe();
}
}
