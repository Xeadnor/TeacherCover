import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Profesor } from '../interfaces/profesor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore: Firestore) { }

  addProfesor(profesor: Profesor){
    const profesorRef = collection(this.firestore,"profesores");
    return addDoc(profesorRef,{
      id: profesor.getIdProfesor(),
      name: profesor.getName(),
      password: profesor.getPassword(),
    });
  }
  getProfesors(): Observable<Profesor[]>{
    const profesorRef = collection(this.firestore,"profesores");
    return collectionData(profesorRef, {idField:"idField"}) as Observable<Profesor[]>;
  }
}
