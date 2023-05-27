import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginaComponent } from './pagina/pagina.component';
import { Router, RouterModule, Routes} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HistorialGuardiasComponent } from './historial-guardias/historial-guardias.component';
import { CalendarioSemanalComponent } from './calendario-semanal/calendario-semanal.component';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { CrearGuardiaComponent } from './crear-guardia/crear-guardia.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HistorialProfesoresComponent } from './historial-profesores/historial-profesores.component';
import { EditarProfesorComponent } from './editar-profesor/editar-profesor.component';
import { SeleccionarGuardiaComponent } from './seleccionar-guardia/seleccionar-guardia.component';
import { EditarGuardiaComponent } from './editar-guardia/editar-guardia.component';
import { ListarIncidenciasComponent } from './listar-incidencias/listar-incidencias.component';





const appRoutes: Routes = [
  {path:"",component: LoginComponent},
  {
    path:"pagina",component : PaginaComponent,
    children : [
      { path: "calendario", component: CalendarioComponent},
      { path: "historial", component: HistorialGuardiasComponent},
      { path: "calendarioSemanal", component: CalendarioSemanalComponent},
      { path: "crearProfesor", component: CrearProfesorComponent},
      { path: "crearGuardia", component: CrearGuardiaComponent},
      { path: "historialProfesores", component: HistorialProfesoresComponent},
      { path: "editarProfesor/:id", component: EditarProfesorComponent},
      { path: "editarGuardia/:idGuardia", component: EditarGuardiaComponent},
      { path: "seleccionarGuardia/:tipo/:hora", component: SeleccionarGuardiaComponent},
      { path: "listarIncidencias", component: ListarIncidenciasComponent},
    ],
  },
  {path:"recover-password",component: RecoverPasswordComponent},
  {path:"**",component : PagenotfoundComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PaginaComponent,
    FooterComponent,
    CalendarioComponent,
    HistorialGuardiasComponent,
    CalendarioSemanalComponent,
    CrearProfesorComponent,
    RecoverPasswordComponent,
    PagenotfoundComponent,
    HistorialProfesoresComponent,
    CrearGuardiaComponent,
    EditarProfesorComponent,
    SeleccionarGuardiaComponent,
    EditarGuardiaComponent,
    ListarIncidenciasComponent

  ],
  imports: [
    MatTableModule,
    CdkTableModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ToastrModule.forRoot({
      maxOpened:5,
      preventDuplicates:true
    }),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot(appRoutes,{enableTracing: false, onSameUrlNavigation : "reload"}),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

  ],
  providers: [MatDatepickerModule ],
  bootstrap: [AppComponent],

})
export class AppModule { }
