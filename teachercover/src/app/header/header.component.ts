import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from '../models/profesor.model';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  constructor( private router: Router, private auth: AuthService) {};

  ngOnInit(): void {
    if(sessionStorage.length > 0){
        this.mostrarNombre();
      }
      
  }
  
  logout(){
    this.router.navigate(['']);
    const divlog = document.getElementById("divLog");
    divlog!.classList.add("d-none")
    sessionStorage.clear();
      this.auth.logOut();
  }
  
  mostrarNombre(){
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
   
    const divlog = document.getElementById("divLog");
    divlog!.classList.remove("d-none")
    const nombreUser = document.getElementById('nombreUser');
    nombreUser!.textContent = profesor["name"];
  }
}
