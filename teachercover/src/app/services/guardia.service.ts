import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Guardia } from '../models/guardia.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore } from "firebase/firestore";

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
  addGuardia(guardia : Guardia){
    const db = getFirestore();
    const dbRef = collection(db, "guardias");

    const data = {
      aula: "B-23",
      curso: "4ºESO-A",
      descripcion: "prueba",
      dia: "Viernes",
      diaSemana: 3,
      estado: "Finalizado",
      hora: 13,
      idGuardia: 4,
      nombreProfesor: "Pablo",
      profesor:3,


   };

   addDoc(dbRef, data)
   .then(docRef => {
   })
   .catch(error => {
   })

  }

}
