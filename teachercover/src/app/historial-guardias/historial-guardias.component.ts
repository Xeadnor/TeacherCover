import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator'

import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginator';
@Component({

  selector: 'app-historial-guardias',
  templateUrl: './historial-guardias.component.html',
  styleUrls: ['./historial-guardias.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class HistorialGuardiasComponent {
  columnas: string[] = ['codigo', 'descripcion', 'test',"prueba","prueba2","prueba3"];

  datos: Articulo[] = [];
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  ngOnInit() {
    for (let x = 1; x <= 100; x++)
      this.datos.push(new Articulo(x, `test ${x}`, "test-test-test-test-test-test","test","test2","test3"));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }
  

}
export class Articulo {
  constructor(public codigo: number, public descripcion: string, public test: string, public prueba: string, public prueba2: string, public prueba3: string) {
  }
}

