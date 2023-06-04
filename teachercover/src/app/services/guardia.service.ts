import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { Observable } from 'rxjs';
import { Guardia } from '../models/guardia.model';
import { Profesor } from 'app/models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class GuardiaService {

  constructor(private firestore: Firestore) { }


  getGuardias(): Observable<Guardia[]> {
    const guardiaref = collection(this.firestore, "guardias");
    return collectionData(guardiaref, { idField: "idField" }) as Observable<Guardia[]>;
  }

  getGuardiasByUser(idProf: number) {
    const profesorRef = collection(this.firestore, "guardias");
    const populationQuery = query(profesorRef, where("profesor", "==", idProf));
    return collectionData(populationQuery, { idField: "idFIeld" });
  }

  //método que calcule la última id para añadir la siguiente id a la guardia
  async getNewId(): Promise<number> {
    let newId = 0;
    const db = getFirestore();

    const q = query(collection(db, "guardias"), orderBy("idGuardia", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newId = doc.data()["idGuardia"] + 1;
    });
    return newId;
  }
  deleteGuardia(idField: string) {
    const db = getFirestore();

    const docRef = doc(db, "guardias", idField);

    deleteDoc(docRef)

  }
  getGuardiasOfProfesor(idProfesor: number): Observable<Guardia[]> {
    //! por implementar
    const guardiaref = collection(this.firestore, "guardias");
    return collectionData(guardiaref, { idField: "idField" }) as Observable<Guardia[]>;

  }

  getGuardiasPendientes(dia: String, hora: number) {
    const guardiaRef = collection(this.firestore, "guardias");
    const populationQuery = query(guardiaRef, where("fecha", "==", dia), where("hora", "==", hora));
    return collectionData(populationQuery, { idField: "idFIeld" });
  }

  //método que compruebe si esxiste una guardia para esa fecha y esa hora de ese profesor
  checkIfExistOnCall(nombreProf: string, fecha: Date, hora: number) {
    const guardiaRef = collection(this.firestore, "guardias");
    const populationQuery = query(guardiaRef, where("profesorCubierto", "==", nombreProf), where("fecha", "==", fecha), where("hora", "==", hora));
    return collectionData(populationQuery, { idField: "idFIeld" });
  }


  async getAGuardiaFromId(idField: String) {
    const db = getFirestore();
    const guardiasRef = doc(db, "guardias", idField.toString());
    const docSnap = await getDoc(guardiasRef);
    return docSnap.data();

  }

  addGuardia(guardia: Guardia, dia: String) {
    const db = getFirestore();
    const dbRef = collection(db, "guardias");

    const data = {
      aula: guardia.getAula(),
      curso: guardia.getCurso(),
      descripcion: guardia.getDescripcion(),
      dia: guardia.getDia(),
      estado: guardia.getEstado(),
      fecha: dia,
      hora: Number(guardia.getHora()),
      horaGuardia: guardia.getHoraGuardia(),
      idGuardia: guardia.getIdGuardia(),
      nombreProfesor: guardia.getNombreProfesor(),
      profesor: guardia.getProfesor(),
      profesorCubierto: guardia.getProfesorCubierto(),
      tipo: guardia.getTipo(),
      incidencia: guardia.getIncidencia(),
      incidenciaTexto: guardia.getIncidenciaTexto(),
      idProfesorCubierto: guardia.getIdProfesorCubierto()
    };
    addDoc(dbRef, data)
      .then(docRef => {

      })
      .catch(error => {
        console.log(error)
      })

  }


  updateGuardia(guardia: Guardia, dia: String) {
    const db = getFirestore();
    const dbRef = doc(db, "guardias", guardia.getIdField());

    const data = {
      aula: guardia.getAula(),
      curso: guardia.getCurso(),
      descripcion: guardia.getDescripcion(),
      dia: guardia.getDia(),
      estado: guardia.getEstado(),
      fecha: dia,
      hora: Number(guardia.getHora()),
      horaGuardia: guardia.getHoraGuardia(),
      idGuardia: guardia.getIdGuardia(),
      nombreProfesor: guardia.getNombreProfesor(),
      profesor: guardia.getProfesor(),
      profesorCubierto: guardia.getProfesorCubierto(),
      tipo: guardia.getTipo(),
      incidencia: guardia.getIncidencia(),
      incidenciaTexto: guardia.getIncidenciaTexto(),
      idProfesorCubierto: Number(guardia.getIdProfesorCubierto())


    };
    setDoc(dbRef, data, { merge: true })
      .then(docRef => {

      })
      .catch(error => {
        console.log(error)
      })

  }

  updateGuardiaName(guardia: Guardia) {
    const db = getFirestore();
    const dbRef = doc(db, "guardias", guardia.getIdField());



    const data = {
      profesorCubierto: guardia.getProfesorCubierto(),
    };
    setDoc(dbRef, data, { merge: true })

      .then(docRef => {

      })
      .catch(error => {
        console.log(error)
      })

  }
  hacerGuardia(guardia: Guardia, profesor: Profesor, tipo : String, num: number) {
    const db = getFirestore();
    const dbRef = doc(db, "guardias", guardia.getIdField());

    console.log(num);
    const data = {
      estado: "Finalizada",
      nombreProfesor: profesor["name"],
      profesor: profesor["id"],
      tipo: tipo,
    };
    setDoc(dbRef, data, { merge: true })
      .then(docRef => {
        console.log("peeee");
        const profesorRef = doc(db,"profesores",profesor["idField"]);

        const data = {
          horasGuardias: num
        }

      setDoc(profesorRef,data, { merge:true})
      })
      .catch(error => {
        console.log(error)
      })

  }
  updateGuardiaNameT(guardia: Guardia) {
    const db = getFirestore();
    const dbRef = doc(db, "guardias", guardia.getIdField());



    const data = {
      nombreProfesor: guardia.getNombreProfesor(),
    };
    setDoc(dbRef, data, { merge: true })

      .then(docRef => {

      })
      .catch(error => {
        console.log(error)
      })

  }

  updateProfesorCubiertoN(guardia: Guardia) {
    const db = getFirestore();
    const dbRef = doc(db, "guardias", guardia.getIdField());



    const data = {
      profesorCubierto : guardia.getProfesorCubierto(),
    };
    setDoc(dbRef, data, { merge: true })

      .then(docRef => {

      })
      .catch(error => {
        console.log(error)
      })

  }

}
