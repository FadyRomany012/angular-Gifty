import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _AngularFirestore:AngularFirestore,
    private _AuthService:AuthService) { }
  addToCart(data:Product) {
    return this._AngularFirestore.collection(`users/${this._AuthService.userId}/cart`).add(data)
  }
  getCart() {
    return this._AngularFirestore.collection(`users/${this._AuthService.userId}/cart`).snapshotChanges()
  }
  getCartLength() {
    return this._AngularFirestore.collection(`users/${this._AuthService.userId}/cart`).valueChanges()
  }
  deleteItem(id) {
    return this._AngularFirestore.doc(`users/${this._AuthService.userId}/cart/${id}`).delete()
  }
  updateCart(id,amount) {
    return this._AngularFirestore.doc(`users/${this._AuthService.userId}/cart/${id}`).update({amount})
  }
} 
