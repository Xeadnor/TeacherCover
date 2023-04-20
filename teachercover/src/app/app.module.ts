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



const appRoutes: Routes = [
  {path:"",component: LoginComponent},
  {
    path:"pagina",component : PaginaComponent,
    children : [
      { path: "calendario", component: CalendarioComponent},
      { path: "historial", component: HistorialGuardiasComponent},
      { path: "calendarioSemanal", component: CalendarioSemanalComponent},

    ]
  },
  

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
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot(appRoutes,{enableTracing: false}),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }