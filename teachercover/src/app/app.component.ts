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

  constructor(private utilsService: UtilsService){}

}
