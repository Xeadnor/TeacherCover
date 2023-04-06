import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {




  mostrarNombre(nombre: string){
    const nombreUser = document.getElementById('nombreUser');
    nombreUser!.textContent = nombre;
  }
}
