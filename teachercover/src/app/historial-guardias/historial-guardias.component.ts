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

  columnas: string[] = ['idGuardia', 'nombreProfesor', 'curso',"aula","descripcion","dia","estado"];
  constructor( private guardiaService: GuardiaService) { }

  
  datos: Guardia[] = [];
  dataSource:any;
  mostrarTabla: boolean;
  public searchForm: FormGroup;
  public nombreProfesor = '';
  public curso = '';
  public aula = '';
  public descripcion = '';
  public dia = '';
  public estado = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.mostrarTabla = true;
    this.guardiaService.getGuardias().subscribe(guardias => {
      guardias.forEach((guardia) => {
        this.datos.push(new Guardia(guardia["diaSemana"],guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"],guardia["nombreProfesor"],guardia["profesor"]));
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
      nombreProfesor: new FormControl(''),
      curso: new FormControl(''),
      aula: new FormControl(''),
      descripcion: new FormControl(''),
      dia: new FormControl(''),
      estado: new FormControl(''),


    });
  }
  getFilterPredicate() {
    return (row: Guardia, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const nombreProfesor = filterArray[0];
      const curso = filterArray[1];
      const aula = filterArray[2];
      const descripcion = filterArray[3];
      const dia = filterArray[4];
      const estado = filterArray[5];



      const matchFilter = [];

      // Fetch data from row

      const columnProfesor = row.nombreProfesor;
      const columnCurso = row.curso;
      const columnAula = row.aula;
      const columnDescripcion = row.descripcion;
      const columnDia = row.dia;
      const columnEstado = row.estado;



      // verify fetching data by our searching values
      const customFilterPR = columnProfesor.toString().toLowerCase().includes(nombreProfesor);
      const customFilterCU = columnCurso.toLowerCase().includes(curso);
      const customFilterAU = columnAula.toLowerCase().includes(aula);
      const customFilterDE = columnDescripcion.toLowerCase().includes(descripcion);
      const customFilterDI = columnDia.toString().toLowerCase().includes(dia);
      const customFilterES = columnEstado.toLowerCase().includes(estado);



      // push boolean values into array
      matchFilter.push(customFilterPR);
      matchFilter.push(customFilterCU);
      matchFilter.push(customFilterAU);
      matchFilter.push(customFilterDE);
      matchFilter.push(customFilterDI);
      matchFilter.push(customFilterES);



      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
  
  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  applyFilter() {
    const pr = this.searchForm.get('nombreProfesor')!.value;
    const cu = this.searchForm.get('curso')!.value;
    const au = this.searchForm.get('aula')!.value;
    const de = this.searchForm.get('descripcion')!.value;
    const di = this.searchForm.get('dia')!.value;
    const es = this.searchForm.get('estado')!.value;



    this.nombreProfesor = pr === null ? '' : pr;
    this.curso = cu === null ? '' : cu;
    this.aula = au === null ? '' : au;
    this.descripcion = de === null ? '' : de;
    this.dia = di === null ? '' : di;
    this.estado = es === null ? '' : es;



    // create string of our searching values and split if by '$'
    const filterValue = this.nombreProfesor + '$' + this.curso + '$' + this.aula + '$' + this.descripcion + '$' + this.dia + '$' + this.estado;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}