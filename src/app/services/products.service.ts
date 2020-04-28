import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage"
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _AngularFirestore: AngularFirestore,
    private _AngularFireStorage:AngularFireStorage) { }
  getProducts() {
    return this._AngularFirestore.collection("products").valueChanges()
  }
  getProductsToAdmin() {
    return this._AngularFirestore.collection("products").snapshotChanges()
  }
  getProductsId() {
    return this._AngularFirestore.collection("products").snapshotChanges()
  }
  addIndex(id, index) {
    return this._AngularFirestore.doc("products/" + id).update({ index })
  }
  addProduct(description:string,price:number,seller:string,imgUrl:File,category:string) {
    let ref = this._AngularFireStorage.ref(`images/${imgUrl.name}`)
    ref.put(imgUrl).then(() => {
      ref.getDownloadURL().subscribe(imgUrl => {
        this._AngularFirestore.collection("products").add({
          description,
          imgUrl,
          seller,
          price,
          category
        })
      })
    })
  }
  deleteProduct(id) {
    return this._AngularFirestore.doc(`products/${id}`).delete()
  }
  updateProduct(price,id){
    return this._AngularFirestore.doc(`products/${id}`).update({price})
  }
}
