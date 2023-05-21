import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { Guardia } from '../models/guardia.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore, orderBy, limit } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

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

  //método que calcule la última id para añadir la siguiente id a la guardia
  async getNewId(): Promise<number>{
    let newId = 0;
    const db = getFirestore();

    const q = query(collection(db, "guardias"), orderBy("idGuardia", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newId = doc.data()["idGuardia"] + 1;
    });
    return newId;
  }

  getGuardiasOfProfesor(idProfesor:number): Observable<Guardia[]>{
    //! por implementar
    const guardiaref = collection(this.firestore,"guardias");
    return collectionData(guardiaref, {idField:"idField"}) as Observable<Guardia[]>;

  }

  getGuardiasPendientes(dia: String,hora: number){
    const guardiaRef = collection(this.firestore,"guardias");
    const populationQuery = query(guardiaRef,where("fecha","==",dia), where("hora","==",hora));
    return collectionData(populationQuery, {idField:"idFIeld"});
  }

  //método que compruebe si esxiste una guardia para esa fecha y esa hora de ese profesor
  checkIfExistOnCall(nombreProf:string, fecha: Date, hora: number ){
    const guardiaRef = collection(this.firestore,"guardias");
    const populationQuery = query(guardiaRef, where("profesorCubierto", "==", nombreProf), where("fecha", "==", fecha), where("hora", "==", hora) );
    return collectionData(populationQuery, {idField:"idFIeld"});
  }





  addGuardia(guardia : Guardia){
    const db = getFirestore();
    const dbRef = collection(db, "guardias");
    const fechaFormateada = guardia.getFecha().toLocaleDateString('es-ES');


    const data = {
      aula: guardia.getAula(),
      curso: guardia.getCurso(),
      descripcion: guardia.getDescripcion(),
      dia: guardia.getDia(),
      estado: guardia.getEstado(),
      fecha: fechaFormateada,
      hora: guardia.getHora(),
      horaGuardia: guardia.getHoraGuardia(),
      idGuardia: guardia.getIdGuardia(),
      nombreProfesor: guardia.getNombreProfesor(),
      profesor:guardia.getProfesor(),
      profesorCubierto:guardia.getProfesorCubierto(),
      tipo: guardia.getTipo()
    };
   addDoc(dbRef, data)
   .then(docRef => {

   })
   .catch(error => {
    console.log(error)
   })

  }

}
