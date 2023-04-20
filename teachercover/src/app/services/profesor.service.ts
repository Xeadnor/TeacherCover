import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Profesor } from '../models/profesor.model';
import { Observable } from 'rxjs';
import { query, where, getDocs } from "firebase/firestore";

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

   async Login(name: String, pass: String){
    let array!: Profesor[];
    const profesorRef = collection(this.firestore,"profesores");
    const populationQuery = query(profesorRef, where("name", "==", name), where("password","==", pass));
    return collectionData(populationQuery, {idField:"idFIeld"});
  }
}



