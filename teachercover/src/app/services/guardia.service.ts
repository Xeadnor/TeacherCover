import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Guardia } from '../models/guardia.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore, orderBy, limit } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class GuardiaService {

  constructor(private firestore: Firestore) { }


  getGuardias(): Observable<Guardia[]>{
    const guardiaref = collection(this.firestore,"guardias");
    return collectionData(guardiaref, {idField:"idField"}) as Observable<Guardia[]>;
  }

  getGuardiasByUser(idProf: number){
    const profesorRef = collection(this.firestore,"guardias");
    const populationQuery = query(profesorRef, where("profesor", "==", idProf));
    return collectionData(populationQuery, {idField:"idFIeld"});
  }

  async getNewId(): Promise<number>{
    let newId = 0;
    const db = getFirestore();

    const q = query(collection(db, "profesores"), orderBy("id", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      newId = doc.data()["id"] + 1;
    });
    return newId;
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
