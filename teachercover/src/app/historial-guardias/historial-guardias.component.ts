import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator'
import { OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from './CustomPaginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { distinct, filter, map, mergeMap, startWith, toArray } from 'rxjs/operators';
import { GuardiaService } from 'app/services/guardia.service';
import { Guardia } from 'app/models/guardia.model';
import { DateAdapter } from '@angular/material/core';
import { Profesor } from 'app/models/profesor.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({

  selector: 'app-historial-guardias',
  templateUrl: './historial-guardias.component.html',
  styleUrls: ['./historial-guardias.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class HistorialGuardiasComponent implements OnInit {

  columnas: string[] = ['idGuardia', 'fecha', 'nombreProfesor', 'curso', "aula", "horaGuardia", "descripcion", "dia", "estado", "profesorCubierto","tipo","incidencia", "opciones"];
  constructor(private router: Router,private guardiaService: GuardiaService, private dateAdapter: DateAdapter<Date>, public dialogo: MatDialog) {
    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek()

  }
  getDateFormat(guardia: Guardia): String {
    var month = guardia.getFecha().getMonth() + 1; //months from 1-12
    var day = guardia.getFecha().getDate();
    var year = guardia.getFecha().getFullYear();
    return day + "/" + month + "/" + year;
  }

  datos: Guardia[] = [];
  dataSource: any;
  mostrarTabla: boolean;
  public searchForm: FormGroup;
  public idGuardia = '';
  public fecha = '';
  public nombreProfesor = '';
  public curso = '';
  public aula = '';
  public descripcion = '';
  public dia = '';
  public estado = '';
  public profesorCubierto = '';
  public horaGuardia = '';
  public tipo = '';
  public incidencia = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();

    if (profesor["role"] == "User") {

      this.mostrarTabla = true;
      this.guardiaService.getGuardiasByUser(profesor["id"]).subscribe(guardias => {
        this.datos.splice(0)
        guardias.forEach((guardia) => {
          this.datos.push(new Guardia(guardia["horaGuardia"], new Date(guardia["fecha"]), guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"], guardia["nombreProfesor"], guardia["profesor"], guardia["idFIeld"], guardia["profesorCubierto"],guardia["tipo"],guardia["incidencia"]));

        })

        this.dataSource = new MatTableDataSource<Guardia>(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.searchFormInit();

        this.dataSource.filterPredicate = this.getFilterPredicate()
      });

    } else {
      this.mostrarTabla = true;
      this.guardiaService.getGuardias().subscribe(guardias => {
        this.datos.splice(0)
        guardias.forEach((guardia) => {
          this.datos.push(new Guardia(guardia["horaGuardia"], new Date(guardia["fecha"]), guardia["dia"], guardia["hora"], guardia["descripcion"], guardia["estado"], guardia["idGuardia"], guardia["aula"], guardia["curso"], guardia["nombreProfesor"], guardia["profesor"], guardia["idField"], guardia["profesorCubierto"],guardia["tipo"],guardia["incidencia"]));

        })
        this.dataSource = new MatTableDataSource<Guardia>(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.searchFormInit();

        this.dataSource.filterPredicate = this.getFilterPredicate()
      });

    }

    this.dataSource = new MatTableDataSource<Guardia>(this.datos);
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();

    this.dataSource.filterPredicate = this.getFilterPredicate()

  }
  dialogEditar(guardia: Guardia): void {
    this.router.navigate(['/pagina/editarGuardia', guardia["idGuardia"]]);

  }
  dialogEliminar(guardia: Guardia): void {
    console.log("modal para eliminar");
    console.log(guardia)
  }
  comprobarAdmin(){
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();
    if(profesor["role"] =="Admin"){
      return false;
    }else{
      return true;
    }
  }

  searchFormInit() {
    this.searchForm = new FormGroup({
      idGuardia: new FormControl(''),
      fecha: new FormControl(''),
      nombreProfesor: new FormControl(''),
      curso: new FormControl(''),
      aula: new FormControl(''),
      descripcion: new FormControl(''),
      dia: new FormControl(''),
      estado: new FormControl(''),
      profesorCubierto: new FormControl(''),
      horaGuardia: new FormControl(''),
      tipo:new FormControl(''),
      incidencia:new FormControl(''),
    });
  }
  getFilterPredicate() {
    return (row: Guardia, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const idGuardia = filterArray[0];
      const fecha = filterArray[1];
      const nombreProfesor = filterArray[2];
      const curso = filterArray[3];
      const aula = filterArray[4];
      const horaGuardia = filterArray[5]
      const descripcion = filterArray[6];
      const dia = filterArray[7];
      const estado = filterArray[8];
      const profesorCubierto = filterArray[9];
      const tipo = filterArray[10];
      const incidencia = filterArray[11];





      const matchFilter = [];

      // Fetch data from row
      const columnIdGuardia = row.idGuardia;
      const columnFecha = row.fecha;
      const columnProfesor = row.nombreProfesor;
      const columnCurso = row.curso;
      const columnAula = row.aula;
      const columnHoraGuardia = row.horaGuardia;
      const columnDescripcion = row.descripcion;
      const columnDia = row.dia;
      const columnEstado = row.estado;
      const columnProfesorCubierto = row.profesorCubierto;
      const columnTipo = row.tipo;
      const columnIncidencia = row.incidencia;




      // verify fetching data by our searching values
      const customFilterGU = columnIdGuardia.toString().toLowerCase().includes(idGuardia);
      const customFilterFE = columnFecha.toString().toLowerCase().includes(fecha);
      const customFilterPR = columnProfesor.toString().toLowerCase().includes(nombreProfesor);
      const customFilterCU = columnCurso.toLowerCase().includes(curso);
      const customFilterAU = columnAula.toLowerCase().includes(aula);
      const customFilterHO = columnHoraGuardia.toString().toLowerCase().includes(horaGuardia);
      const customFilterDE = columnDescripcion.toLowerCase().includes(descripcion);
      const customFilterDI = columnDia.toString().toLowerCase().includes(dia);
      const customFilterES = columnEstado.toLowerCase().includes(estado);
      const customFilterPC = columnProfesorCubierto.toLowerCase().includes(profesorCubierto);
      const customFilterTI = columnTipo.toLowerCase().includes(tipo);
      const customFilterIN = columnIncidencia.toString().toLowerCase().includes(incidencia);






      // push boolean values into array
      matchFilter.push(customFilterGU);
      matchFilter.push(customFilterFE);
      matchFilter.push(customFilterPR);
      matchFilter.push(customFilterCU);
      matchFilter.push(customFilterAU);
      matchFilter.push(customFilterHO);
      matchFilter.push(customFilterDE);
      matchFilter.push(customFilterDI);
      matchFilter.push(customFilterES);
      matchFilter.push(customFilterPC);
      matchFilter.push(customFilterTI);
      matchFilter.push(customFilterIN);






      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  applyFilter() {
    const gu = this.searchForm.get('idGuardia')!.value;
    const fe = this.searchForm.get('fecha')!.value;
    const pr = this.searchForm.get('nombreProfesor')!.value;
    const cu = this.searchForm.get('curso')!.value;
    const au = this.searchForm.get('aula')!.value;
    const ho = this.searchForm.get('horaGuardia')!.value;
    const de = this.searchForm.get('descripcion')!.value;
    const di = this.searchForm.get('dia')!.value;
    const es = this.searchForm.get('estado')!.value;
    const pc = this.searchForm.get('profesorCubierto')!.value;
    const ti = this.searchForm.get('tipo')!.value;
    const inc = this.searchForm.get('incidencia')!.value;







    this.idGuardia = gu === null ? '' : gu;
    this.fecha = (fe === null || fe === '') ? '' : fe.toString();
    this.nombreProfesor = pr === null ? '' : pr;
    this.curso = cu === null ? '' : cu;
    this.aula = au === null ? '' : au;
    this.horaGuardia = ho === null ? '' : ho;
    this.descripcion = de === null ? '' : de;
    this.dia = di === null ? '' : di;
    this.estado = es === null ? '' : es;
    this.profesorCubierto = pc === null ? '' : pc;
    this.tipo = ti === null ? '' : ti;
    this.incidencia = inc === null ? '' : inc;






    // create string of our searching values and split if by '$'
    const filterValue = this.idGuardia + '$' + this.fecha + '$' + this.nombreProfesor + '$' + this.curso + '$' + this.aula + '$' + this.horaGuardia + '$'+ this.descripcion + '$' + this.dia + '$' + this.estado + '$' + this.profesorCubierto + '$' + this.tipo+ '$' + this.incidencia;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
