import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
user:Observable<firebase.User>
userId=""
alert=false
username
  constructor(private _AngularFireAuth:AngularFireAuth,private User:UserService) {
    this.user=this._AngularFireAuth.user

   }
  sign(email,pass) {
    return this._AngularFireAuth.auth.createUserWithEmailAndPassword(email,pass)
  }
  login(email,pass){
    return this._AngularFireAuth.auth.signInWithEmailAndPassword(email,pass)
  }
  logout() {
    return this._AngularFireAuth.auth.signOut();
  }
}
