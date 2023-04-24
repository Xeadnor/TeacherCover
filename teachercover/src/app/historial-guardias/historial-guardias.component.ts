import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator'
import {OnInit,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginator';
import { MatSort } from '@angular/material/sort';

@Component({

  selector: 'app-historial-guardias',
  templateUrl: './historial-guardias.component.html',
  styleUrls: ['./historial-guardias.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class HistorialGuardiasComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  columnas: string[] = ['codigo', 'descripcion', 'test',"prueba","prueba2","prueba3"];

  datos: Articulo[] = [];
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    for (let x = 1; x <= 100; x++)
    if(x%2 == 0){
      this.datos.push(new Articulo(x, `test ${x}`, "Martes","test","test2","test3"));
    }else{
      this.datos.push(new Articulo(x, `test ${x}`, "Jueves","test","test2","test3"));

    }
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.paginator = this.paginator;
  }
  
  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

}
export class Articulo {
  constructor(public codigo: number, public descripcion: string, public test: string, public prueba: string, public prueba2: string, public prueba3: string) {
  }


}

