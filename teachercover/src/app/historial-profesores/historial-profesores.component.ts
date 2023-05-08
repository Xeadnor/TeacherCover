import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator'
import { OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomPaginator } from '../historial-guardias/CustomPaginator';
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
import { Router } from '@angular/router';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-historial-profesores',
  templateUrl: './historial-profesores.component.html',
  styleUrls: ['./historial-profesores.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ]
})
export class HistorialProfesoresComponent implements OnInit{
  columnas: string[] = ['id', 'email', 'name', 'horasGuardias', "role", "validate","opciones"];
  rol: string;
  constructor(private router: Router,private profesorService: ProfesorService,private guardiaService: GuardiaService, private toastr: ToastrService, private auth: AuthService) { };
  datos: Profesor[] = [];
  dataSource: any;
  mostrarTabla: boolean;
  public searchForm: FormGroup;
  public id = '';
  public email = '';
  public name = '';
  public horasGuardias = '';
  public role = '';
  public validate = '';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    let userJson = sessionStorage.getItem('profesor');
    let profesor = userJson !== null ? JSON.parse(userJson) : new Profesor();

    if (profesor["role"] == "User") {
        this.router.navigate(["/pagina/calendario"]);
    } else {
      console.log("prueba");
      this.mostrarTabla = true;
      this.profesorService.getProfesors().subscribe(profesores => {
        profesores.forEach((profesor) => {
          let prof = new Profesor();
          prof.setIdProfesor(profesor["id"]);
          prof.setEmail(profesor["email"]);
          prof.setName(profesor["name"]);
          prof.setHorasGuardias(profesor["horasGuardias"]);
          prof.setRole(profesor["role"]);
          prof.setValidate(profesor["validate"]);
          prof.setIdField(profesor["idField"]);


          if (!this.datos.find(item => item.id === prof.getIdProfesor())) { // search by id
            this.datos.push(prof);
          }
        })
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.searchFormInit();

        this.dataSource.filterPredicate = this.getFilterPredicate()
      });
      
    }

    this.dataSource = new MatTableDataSource<Profesor>(this.datos);
    this.dataSource.paginator = this.paginator;

    this.searchFormInit();

    this.dataSource.filterPredicate = this.getFilterPredicate()

  }
  dialogEditar(profesor: Profesor): void {
    console.log("modal para editar");
  }
  dialogEliminar(profesor:Profesor): void {
    //!  COMPROBRAR TAMBIEN CON UN MODAL PARA CONFIRMAR LA ELIMINACION.
    this.datos = this.datos.filter(function(el) { return el.id != profesor.getIdProfesor(); }); 
    this.datos.splice(profesor.getIdProfesor(), 1 );
   this.profesorService.deleteProfesor(profesor.getIdField())
   this.dataSource = new MatTableDataSource<Profesor>(this.datos);

   this.toastr.success("Se ha borrado con exito el profesor: " + profesor.getName(),"Profesor borrado",{timeOut:3000,closeButton:true,positionClass:"toast-top-right"})



  }
  searchFormInit() {
    this.searchForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      name : new FormControl(''),
      horasGuardias: new FormControl(''),
      role: new FormControl(''),
      validate: new FormControl(''),

    });
  }
  comprobarAdmin(profesor : Profesor){
      if(profesor.getRole() =="Admin"){
        return true;
      }else{
        return false;
      }
  }
  getFilterPredicate() {
    return (row: Profesor, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$');
      const id = filterArray[0];
      const email = filterArray[1];
      const name = filterArray[2];
      const horasGuardias = filterArray[3];
      const role = filterArray[4];
      const validate = filterArray[5];


      const matchFilter = [];

      // Fetch data from row
      const columnId = row.id;
      const columnEmail = row.email;
      const columnName = row.name;
      const columnHorasGuardias = row.horasGuardias;
      const columnRole = row.role;
      const columnValidate = row.validate;


      // verify fetching data by our searching values
      const customFilterID = columnId.toString().toLowerCase().includes(id);
      const customFilterEM = columnEmail.toLowerCase().includes(email);
      const customFilterNA = columnName.toLowerCase().includes(name);
      const customFilterHO = columnHorasGuardias.toString().toLowerCase().includes(horasGuardias);
      const customFilterRO = columnRole.toLowerCase().includes(role);
      const customFilterVA = columnValidate.toString().toLowerCase().includes(validate);


      // push boolean values into array
      matchFilter.push(customFilterID);
      matchFilter.push(customFilterEM);
      matchFilter.push(customFilterNA);
      matchFilter.push(customFilterHO);
      matchFilter.push(customFilterRO);
      matchFilter.push(customFilterVA);




      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  public doFilter = (event: Event) => {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
  }

  applyFilter() {
    const id = this.searchForm.get('id')!.value;
    const em = this.searchForm.get('email')!.value;
    const na = this.searchForm.get('name')!.value;
    const ho = this.searchForm.get('horasGuardias')!.value;
    const ro = this.searchForm.get('role')!.value;
    const va = this.searchForm.get('validate')!.value;


    this.id = id === null ? '' : id;
    this.email = em === null ? '' : em;
    this.name = na === null ? '' : na;
    this.horasGuardias = ho === null ? '' : ho;
    this.role = ro === null ? '' : ro;
    this.validate = va === null ? '' : va;

    // create string of our searching values and split if by '$'
    const filterValue = this.id + '$' + this.email + '$' + this.name + '$' + this.horasGuardias + '$' + this.role + '$' + this.validate;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }







}
