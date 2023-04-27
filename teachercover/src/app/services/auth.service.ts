import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, updatePassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { 

  }


  login (user:string, pass:string){
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  changePassword(pass:string){
    const auth = getAuth();

    const user = auth.currentUser
    updatePassword(user!, pass).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  getEmail(){
    return this.auth.authState;
  }

  logOut(){
    return this.auth.signOut();
  }
}
