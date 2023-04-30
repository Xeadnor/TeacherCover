import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator'
import {OnInit,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {FormControl,Validators} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {distinct, map, mergeMap, startWith, toArray} from 'rxjs/operators';
import { GuardiaService } from 'app/services/guardia.service';

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
 guardiaService: GuardiaService
  columnas: string[] = ['codigo', 'descripcion', 'test',"prueba","prueba2","prueba3"];

  datos: Articulo[] = [];
  dataSource:any;
  public searchForm: FormGroup;
  public descripcion = '';
  public test = '';

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

    this.searchFormInit();
    /* Filter predicate used for filtering table per different columns
    *  */
    this.dataSource.filterPredicate = this.getFilterPredicate()
 
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      descripcion: new FormControl(''),
      test: new FormControl(''),
    });
  }
  getFilterPredicate() {
    return (row: Articulo, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const descripcion = filterArray[0];
      const test = filterArray[1];

      const matchFilter = [];

      // Fetch data from row

      const columnDescripcion = row.descripcion;
      const columnTest = row.test;

      // verify fetching data by our searching values
      const customFilterDS = columnDescripcion.toLowerCase().includes(descripcion);
      const customFilterAS = columnTest.toLowerCase().includes(test);

      // push boolean values into array
      matchFilter.push(customFilterDS);
      matchFilter.push(customFilterAS);

      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
  
  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  applyFilter() {
    const as = this.searchForm.get('descripcion')!.value;
    const ds = this.searchForm.get('test')!.value;

    this.descripcion = as === null ? '' : as;
    this.test = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.descripcion + '$' + this.test;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export class Articulo {
  constructor(public codigo: number, public descripcion: string, public test: string, public prueba: string, public prueba2: string, public prueba3: string) {
  }


}

