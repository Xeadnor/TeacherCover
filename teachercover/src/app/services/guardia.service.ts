import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Guardia } from '../models/guardia.model';
import { Observable } from 'rxjs';
import { query, where, getDocs } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class GuardiaService {

  constructor(private firestore: Firestore) { }

  getGuardias(): Observable<Guardia[]>{
    const guardiaref = collection(this.firestore,"guardias");
    return collectionData(guardiaref, {idField:"idField"}) as Observable<Guardia[]>;
    
  }


  getGuardiasOfProfesor(idProfesor:number): Observable<Guardia[]>{
    //! por implementar
    const guardiaref = collection(this.firestore,"guardias");
    return collectionData(guardiaref, {idField:"idField"}) as Observable<Guardia[]>;
    
  }

}
