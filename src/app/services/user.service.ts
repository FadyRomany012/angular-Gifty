import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _AngularFireStore:AngularFirestore) { }
    
  addUser(name,id) {
     return this._AngularFireStore.doc(`users/${id}`).set({
       name,
       admin:false
     })
  }
  getUserName(id) {
    return this._AngularFireStore.doc(`users/${id}`).valueChanges()
 }
 
}
