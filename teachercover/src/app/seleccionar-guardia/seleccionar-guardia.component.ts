import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ProfesorService } from 'app/services/profesor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seleccionar-guardia',
  templateUrl: './seleccionar-guardia.component.html',
  styleUrls: ['./seleccionar-guardia.component.css']
})
export class SeleccionarGuardiaComponent implements OnInit, OnDestroy  {
  private sub: any;
  tipoGuardia: string;
  constructor(private route: ActivatedRoute,private router: Router, private profesorService: ProfesorService, private toastr: ToastrService, private auth: AuthService) { };

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.tipoGuardia =params['tipo']; 
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
