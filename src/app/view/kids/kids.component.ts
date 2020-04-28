import { Component, OnInit, OnDestroy } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {

  products:Product[]=[]
obj=[]
amountError=-1
isAdmin
adminError=-1

constructor(private _Title:Title,
  private _ProuductService:ProductsService,
  public _AuthService:AuthService,
  private _Router:Router,
  private _CartService:CartService,
  private _User:UserService) {
    this._Title.setTitle("Kids")

   }


  ngOnInit() {
   this._ProuductService.getProductsId().subscribe(data => {
      this.obj=[]
      this.products = data.map(d => {
        return {
          id:d.payload.doc.id,
          ...d.payload.doc.data()
        }
      })
      for (let i = 0;i < this.products.length;i++) {
        if (this.products[i].category === "kids") {
          this._ProuductService.addIndex(this.products[i].id,i)
          this.obj.push(this.products[i])
        }
      }
      console.log(this.obj)
    })

  }
  addToCart(amount, i) {
    if (this._AuthService.userId) {
   this._User.getUserName(this._AuthService.userId).subscribe(data => {
        this.isAdmin=data
        if(this.isAdmin.admin===true) {
          this.adminError = i
          setTimeout(() => {this.adminError= -1},2000)
        } else if (this.isAdmin.admin===false) {
          if (amount.value === "") {
            this.amountError = i
          } else {
            this.amountError = -1
            let index = this.products[i]
            let data = {
              seller: index.seller,
              imgUrl: index.imgUrl,
              price: index.price,
              amount: +amount.value
            }
            this._CartService.addToCart(data).then(() => {
              this._AuthService.alert = true
              setTimeout(() => { this._AuthService.alert = false }, 2000)
            })
          }
        } 

    }) 
    } else {
      this._Router.navigate(["/login"])
    } 
  }
 
}
