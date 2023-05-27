import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CalendarioSemanalComponent } from './calendario-semanal/calendario-semanal.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HistorialGuardiasComponent } from './historial-guardias/historial-guardias.component';
import { LoginComponent } from './login/login.component';
import { PaginaComponent } from './pagina/pagina.component';
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
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CrearGuardiaComponent } from './crear-guardia/crear-guardia.component';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { EditarGuardiaComponent } from './editar-guardia/editar-guardia.component';
import { EditarProfesorComponent } from './editar-profesor/editar-profesor.component';
import { HistorialProfesoresComponent } from './historial-profesores/historial-profesores.component';
import { ListarIncidenciasComponent } from './listar-incidencias/listar-incidencias.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SeleccionarGuardiaComponent } from './seleccionar-guardia/seleccionar-guardia.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "pagina", component: PaginaComponent,
    children: [
      { path: "calendario", component: CalendarioComponent },
      { path: "historial", component: HistorialGuardiasComponent },
      { path: "calendarioSemanal", component: CalendarioSemanalComponent },
      { path: "crearProfesor", component: CrearProfesorComponent },
      { path: "crearGuardia", component: CrearGuardiaComponent },
      { path: "historialProfesores", component: HistorialProfesoresComponent },
      { path: "editarProfesor/:id", component: EditarProfesorComponent },
      { path: "editarGuardia/:idGuardia", component: EditarGuardiaComponent },
      { path: "seleccionarGuardia/:tipo/:hora", component: SeleccionarGuardiaComponent },
      { path: "listarIncidencias", component: ListarIncidenciasComponent },
    ],
  },
  { path: "recover-password", component: RecoverPasswordComponent },
  { path: "**", component: PagenotfoundComponent }
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
      maxOpened: 5,
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot(appRoutes, { enableTracing: false, onSameUrlNavigation: "reload" }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],

})
export class AppModule { }
