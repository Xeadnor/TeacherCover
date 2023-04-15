import { Component } from '@angular/core';
import { Guardia } from './interfaces/guardia.interface';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teachercover';
  meetings : Guardia[] = [
    {dayWeek: 1, hour: 11, description: "Reunión con Javier"},
    {dayWeek: 3, hour: 16, description: "Reunión con Pedro"},
    {dayWeek: 4, hour: 13, description: "Raunión con Claudia"},
    {dayWeek: 4, hour: 15, description: "Raunión con Roxana"},
  ]


  constructor(private utilsService: UtilsService){}

}
