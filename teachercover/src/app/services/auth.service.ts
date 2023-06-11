import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { 

  }


  login (user:string, pass:string){
    return this.auth.signInWithEmailAndPassword(user, pass);
  }

  registrar (email:string){
    return this.auth.createUserWithEmailAndPassword(email, "IESinfanta23");
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

  sendResetPassword(email: string){
    this.auth.sendPasswordResetEmail(email).then(() => {
      
    }, error => {
      console.log("error");
    } )

  }

  getEmail(){
    return this.auth.authState;
  }

  logOut(){
    return this.auth.signOut();
  }
}
