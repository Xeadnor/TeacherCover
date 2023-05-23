import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, setDoc } from '@angular/fire/firestore';
import { Guardia } from '../models/guardia.model';
import { Observable } from 'rxjs';
import { query, where, getDocs, getFirestore, orderBy, limit } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { Aula } from 'app/models/aula.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private firestore: Firestore) { }


  getAulas(): Observable<Aula[]>{
    const aulasRef = collection(this.firestore,"aulas");
    return collectionData(aulasRef, {idField:"idField"}) as Observable<Aula[]>;
  }
}