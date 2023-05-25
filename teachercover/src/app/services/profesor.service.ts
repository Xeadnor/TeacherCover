import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { Profesor } from '../models/profesor.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore, orderBy, limit, deleteDoc, getDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {


  constructor(private firestore: Firestore) { }


  getProfesors(): Observable<Profesor[]>{
    const profesorRef = collection(this.firestore,"profesores");
    return collectionData(profesorRef, {idField:"idField"}) as Observable<Profesor[]>;
  }

  async removeGuardia(id: number){

    const db = getFirestore();
    let number  = 0
    let idField = "";
    const q = query(collection(db, "profesores"),where("id", "==",id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

       number = doc.data()["horasGuardias"];
       idField = doc.id;


    });

      const profesorRef = doc(db,"profesores",idField);

        const data = {
          horasGuardias: number - 1
        }

      setDoc(profesorRef,data, { merge:true})

  }

  deleteProfesor(idField: string){
    const db = getFirestore();

    const docRef = doc(db, "profesores", idField);

    deleteDoc(docRef)

  }


   async getDataFromEmail(email: String){
    const profesorRef = collection(this.firestore,"profesores");
    const populationQuery = query(profesorRef, where("email", "==", email));
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


  async confirmEmail(){
    const db = getFirestore();
    const profesorRef = collection(db,"profesores");
    const docsSnap = await getDocs(profesorRef);
    return docsSnap;
  }

  async getATeacherFromId(idField : String){
    const db = getFirestore();
    const profesorRef = doc(db,"profesores", idField.toString());
    const docSnap = await getDoc(profesorRef);
    return docSnap.data();

  }

  updateUserValidate(idField: String) {
    const db = getFirestore();
    const profesorRef = doc(db,"profesores",idField.toString());

    const data = {
      validate : 1,
    }

    setDoc(profesorRef,data, { merge:true})
    .then(docRef => {
    })
    .catch(error =>{
    })

    }


    updateCode(idField: String, code : String) {
      const db = getFirestore();
      const profesorRef = doc(db,"profesores",idField.toString());

      const data = {
        code: code,
      }

      setDoc(profesorRef,data, { merge:true})
      .then(docRef => {
      })
      .catch(error =>{
      })

      }

      updateTeacher(profesor: Profesor) {
        const db = getFirestore();
        const profesorRef = doc(db,"profesores",profesor.getIdField());

        const data = {
          validate: profesor.getValidate(),
          horasGuardias: profesor.gethorasGuardias(),
          id: profesor.getIdProfesor(),
          role: profesor.getRole(),
          name: profesor.getName(),
          email: profesor.getEmail(),
          horarioGuardias : {
            lunes: (profesor.getHorarioGuardias().get("lunes")!),
            martes: (profesor.getHorarioGuardias().get("martes")!),
            miercoles: (profesor.getHorarioGuardias().get("miercoles")!),
            jueves: (profesor.getHorarioGuardias().get("jueves")!),
            viernes:(profesor.getHorarioGuardias().get("viernes")!),
          },
          horarioGuardiasApoyo : {
            lunes: (profesor.getHorarioGuardiasApoyo().get("lunes")!),
            martes: (profesor.getHorarioGuardiasApoyo().get("martes")!),
            miercoles: (profesor.getHorarioGuardiasApoyo().get("miercoles")!),
            jueves: (profesor.getHorarioGuardiasApoyo().get("jueves")!),
            viernes:(profesor.getHorarioGuardiasApoyo().get("viernes")!),
          },
        }

        setDoc(profesorRef,data, { merge:true})
        .then(docRef => {
        })
        .catch(error =>{
        })

        }


      addProfesor(profesor : Profesor){
        const db = getFirestore();
        const dbRef = collection(db, "profesores");
        let prueba = parseInt("24");
        const data = {
          validate: 0,
          horasGuardias: 0,
          id: profesor.getIdProfesor(),
          role: "User",
          name: profesor.getName(),
          email: profesor.getEmail(),
          horarioGuardias : {
            lunes: +(profesor.getHorarioGuardias().get("lunes")!),
            martes: +(profesor.getHorarioGuardias().get("martes")!),
            miercoles: +(profesor.getHorarioGuardias().get("miercoles")!),
            jueves: +(profesor.getHorarioGuardias().get("jueves")!),
            viernes:+(profesor.getHorarioGuardias().get("viernes")!),
          },
          horarioGuardiasApoyo : {
            lunes: +(profesor.getHorarioGuardiasApoyo().get("lunes")!),
            martes: +(profesor.getHorarioGuardiasApoyo().get("martes")!),
            miercoles: +(profesor.getHorarioGuardiasApoyo().get("miercoles")!),
            jueves: +(profesor.getHorarioGuardiasApoyo().get("jueves")!),
            viernes:+(profesor.getHorarioGuardiasApoyo().get("viernes")!),
          },
        }



       addDoc(dbRef, data)
       .then(docRef => {
       })
       .catch(error => {
       })

      }

    }




