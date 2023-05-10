import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Profesor } from 'app/models/profesor.model';
import { Guardia } from 'app/models/guardia.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GuardiaService } from 'app/services/guardia.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-guardia',
  templateUrl: './crear-guardia.component.html',
  styleUrls: ['./crear-guardia.component.css']
})
export class CrearGuardiaComponent implements OnInit {
  createOnCallForm: FormGroup;
  rol: String;
  nombreProf: String;
  guardiaFecha: Date;
  guardiaHora: number;
  aulaGuardia: String;
  infoGuardia: String;


  constructor(private router: Router, private guardiaService: GuardiaService, private toastr: ToastrService) { };


  @ViewChild('f') f : NgForm
  ngOnInit(): void {

    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    this.rol = profesor["role"]
    if (this.rol != "Admin") {
      this.router.navigate(["/pagina/calendario"]);
    }


    this.createOnCallForm = new FormGroup({
      nombreProf: new FormControl("", Validators.required),
      horaGuardia: new FormControl("", Validators.required),
      aulaGuardia: new FormControl("", Validators.required),
      infoGuardia: new FormControl("", Validators.required)

    }, { updateOn: "submit" });
  }


  async createOnCall() {
    let nombreProfe = this.createOnCallForm.controls["nombreProf"].value;
    //TODO pendiente crear guardia
  }

}
