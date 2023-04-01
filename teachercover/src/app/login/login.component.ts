import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorService } from '../services/profesor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private profesorService: ProfesorService) {
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      password: new FormControl()
      
    })
      
    }
  ngOnInit(): void {
  }
  
  async onSubmit(){
    console.log("prueba");
    const response = await this.profesorService.addProfesor(this.formulario.value);
    console.log(response);
  }

  }


