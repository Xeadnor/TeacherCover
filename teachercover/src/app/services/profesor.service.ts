import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Profesor from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore: Firestore) { }

  addProfesor(profesor: Profesor){
    const profesorRef = collection(this.firestore,"profesores");
    return addDoc(profesorRef,profesor);
  }
}
