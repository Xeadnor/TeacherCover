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
import { Guardia } from 'app/models/guardia.model';

@Component({

  selector: 'app-historial-guardias',
  templateUrl: './historial-guardias.component.html',
  styleUrls: ['./historial-guardias.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class HistorialGuardiasComponent implements OnInit {

  columnas: string[] = ['idGuardia', 'profesor', 'curso',"aula","descripcion","diaSemana","estado"];
  constructor( private guardiaService: GuardiaService) { }

  
  datos: Guardia[] = [];
  dataSource:any;
  mostrarTabla: boolean;
  public searchForm: FormGroup;
  public profesor = '';
  public curso = '';
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.mostrarTabla = true;
    this.guardiaService.getGuardias().subscribe(guardias => {
      guardias.forEach((guardia) => {

        this.datos.push(new Guardia(guardia["diaSemana"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"],guardia["profesor"]));
      })
    this.dataSource = new MatTableDataSource<Guardia>(this.datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();
    /* Filter predicate used for filtering table per different columns
    *  */
    this.dataSource.filterPredicate = this.getFilterPredicate()
    });

    this.dataSource = new MatTableDataSource<Guardia>(this.datos);
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();
    /* Filter predicate used for filtering table per different columns
    *  */
    this.dataSource.filterPredicate = this.getFilterPredicate()
 
  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      profesor: new FormControl(''),
      curso: new FormControl(''),
    });
  }
  getFilterPredicate() {
    return (row: Guardia, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const profesor = filterArray[0];
      const curso = filterArray[1];

      const matchFilter = [];

      // Fetch data from row

      const columnProfesor = row.profesor;
      const columnCurso = row.curso;

      // verify fetching data by our searching values
      const customFilterDS = columnProfesor.toString().toLowerCase().includes(profesor);
      const customFilterAS = columnCurso.toLowerCase().includes(curso);

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
    const as = this.searchForm.get('profesor')!.value;
    const ds = this.searchForm.get('curso')!.value;

    this.profesor = as === null ? '' : as;
    this.curso = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue = this.profesor + '$' + this.curso;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}