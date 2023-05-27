import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomPaginator } from 'app/historial-guardias/CustomPaginator';
import { Guardia } from 'app/models/guardia.model';
import { Profesor } from 'app/models/profesor.model';
import { AuthService } from 'app/services/auth.service';
import { GuardiaService } from 'app/services/guardia.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-incidencias',
  templateUrl: './listar-incidencias.component.html',
  styleUrls: ['./listar-incidencias.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class ListarIncidenciasComponent {
  columnas: string[] = ['idIncidencia', 'idGuardia', 'fecha', 'nombreProfesor','profesorCubierto', 'curso', 'aula', 'horaGuardia', 'incidenciaTexto'];
  rol: string;
  constructor(private route: ActivatedRoute,public dialog: MatDialog,private router: Router,private profesorService: ProfesorService,private guardiaService: GuardiaService, private toastr: ToastrService, private auth: AuthService) { };
  datos: Guardia[] = [];
  dataSource: any;
  mostrarTabla: boolean;
  public searchForm: FormGroup;
  public idIncidencia = '';
  public idGuardia = '';
  public fecha = '';
  public nombreProfesor = '';
  public profesorCubierto = '';
  public curso = '';
  public aula = '';
  public horaGuardia = '';
  public incidenciaTexto = '';
  public bootstrap: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    console.log("holiiiiiiiiiiiiiiiiiiiiiii")
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();

    if (profesor["role"] == "User") {
        this.router.navigate(["/pagina/calendario"]);
    } else {
      this.mostrarTabla = true;
      this.guardiaService.getGuardias().subscribe(guardias => {
        guardias.forEach((guardia) => {
          console.log(guardia, "guaardiaaaaaa")
          if(guardia.incidencia){
            let guard = new Guardia();
            guard.setIdGuardia(guardia["idGuardia"]);
            guard.setFecha(guardia["fecha"]);
            guard.setNombreProfesor(guardia["nombreProfesor"]);
            guard.setProfesorCubierto(guardia["profesorCubierto"]);
            guard.setCurso(guardia["curso"]);
            guard.setAula(guardia["aula"]);
            guard.setHoraGuardia(guardia["horaGuardia"]);
            guard.setIncidenciaTexto(guardia["incidenciaTexto"]);

            if (!this.datos.find(item => item.idGuardia === guard.getIdGuardia())) { // search by id
              this.datos.push(guard);
            }
          }


        })
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

  searchFormInit() {
    this.searchForm = new FormGroup({
      idIncidencia: new FormControl(''),
      idGuardia: new FormControl(''),
      fecha: new FormControl(''),
      nombreProfesor : new FormControl(''),
      profesorCubierto: new FormControl(''),
      curso: new FormControl(''),
      aula: new FormControl(''),
      horaGuardia: new FormControl(''),
      incidenciaTexto: new FormControl('')


    });
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  applyFilter() {
    const idI = this.searchForm.get('idIncidencia')!.value;
    const idG = this.searchForm.get('idGuardia')!.value;
    const fe = this.searchForm.get('fecha')!.value;
    const np = this.searchForm.get('nombreProfesor')!.value;
    const pc = this.searchForm.get('profesorCubierto')!.value;
    const cu = this.searchForm.get('curso')!.value;
    const au = this.searchForm.get('aula')!.value;
    const hg = this.searchForm.get('horaGuardia')!.value;
    const it = this.searchForm.get('incidenciaTexto')!.value;




    this.idIncidencia = idI === null ? '' : idI;
    this.idGuardia = idG === null ? '' : idG;
    this.fecha = fe === null ? '' : fe;
    this.nombreProfesor = np === null ? '' : np;
    this.profesorCubierto = pc === null ? '' : pc;
    this.curso = cu === null ? '' : cu;
    this.aula = au === null ? '' : au;
    this.horaGuardia = hg === null ? '' : hg;
    this.incidenciaTexto = it === null ? '' : it;


    // create string of our searching values and split if by '$'
    const filterValue = this.idIncidencia + '$' + this.idGuardia + '$' + this.fecha + '$' + this.nombreProfesor + '$' + this.profesorCubierto + '$' + this.curso;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate() {
    return (row: Guardia, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const idGuardia = filterArray[0];
      const fecha = filterArray[1];
      const nombreProfesor = filterArray[2];
      const profesorCubierto = filterArray[3];
      const curso = filterArray[4];
      const aula = filterArray[5];
      const horaGuardia = filterArray[5];
      const incidenciaTexto = filterArray[5];


      const matchFilter = [];

      // Fetch data from row
      const columnIdGuardia = row.idGuardia;
      const columnFecha = row.fecha;
      const columnNombreProfesor = row.nombreProfesor;
      const columnProfesorCubierto = row.profesorCubierto;
      const columncurso = row.curso;
      const columnAula = row.aula;
      const columnHoraGuardia = row.horaGuardia;
      const columnIncidenciaTexto = row.incidenciaTexto;


      // verify fetching data by our searching values
      const customFilterIDG = columnIdGuardia.toString().toLowerCase().includes(idGuardia);
      const customFilterFE = columnFecha.toString().toLowerCase().includes(fecha);
      const customFilterNP = columnNombreProfesor.toLowerCase().includes(nombreProfesor);
      const customFilterPC = columnProfesorCubierto.toString().toLowerCase().includes(profesorCubierto);
      const customFilterCU = columncurso.toLowerCase().includes(curso);
      const customFilterAU = columnAula.toString().toLowerCase().includes(aula);
      const customFilterHG= columnHoraGuardia.toString().toLowerCase().includes(horaGuardia);
      const customFilterIT = columnIncidenciaTexto.toString().toLowerCase().includes(incidenciaTexto);


      // push boolean values into array
      matchFilter.push(customFilterIDG);
      matchFilter.push(customFilterFE);
      matchFilter.push(customFilterNP);
      matchFilter.push(customFilterPC);
      matchFilter.push(customFilterCU);
      matchFilter.push(customFilterAU);
      matchFilter.push(customFilterHG);
      matchFilter.push(customFilterIT);





      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }
}