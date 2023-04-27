import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { Profesor } from '../models/profesor.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore } from "firebase/firestore";
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

   async getDataFromEmail(email: String){
    let array!: Profesor[];
    const profesorRef = collection(this.firestore,"profesores");
    const populationQuery = query(profesorRef, where("email", "==", email));
    return collectionData(populationQuery, {idField:"idFIeld"});
  }

  async confirmEmail(){
    const db = getFirestore();
    const profesorRef = collection(db,"profesores");
    const docsSnap = await getDocs(profesorRef);
    return docsSnap;
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
}



