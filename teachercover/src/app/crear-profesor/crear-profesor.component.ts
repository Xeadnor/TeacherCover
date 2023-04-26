import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent implements OnInit {
  createTeacherForm: FormGroup;
  ngOnInit(): void {
    this.createTeacherForm = new FormGroup({
      emailLogin: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
  });
  }
  
  
  
  
  
  createTeacher(){
  }


}
