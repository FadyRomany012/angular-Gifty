import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { ProductsService } from 'src/app/services/products.service';
import {Title} from "@angular/platform-browser";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  index
  obj
  amountError=false
  isAdmin
  adminError=false

  constructor(private _Title:Title,
    private _ProductService:ProductsService,
    public _AuthService:AuthService,
    private _Router:Router, 
    private _CartService:CartService,
    private _ActivatedRoute:ActivatedRoute,
    private _User:UserService) { 
this._Title.setTitle("Product Details") 

    }

  ngOnInit() {
  this._ActivatedRoute.params.subscribe(data => this.index = data["n"])

   this._ProductService.getProducts().subscribe(data => this.obj=data[this.index])
  
  }
  addToCart(amount) {
    if (this._AuthService.userId) {
     this._User.getUserName(this._AuthService.userId).subscribe(data => {
        this.isAdmin=data
        if(this.isAdmin.admin===true) {
          this.adminError = true
          setTimeout(() => {this.adminError= false},2000)
        } else if (this.isAdmin.admin===false) {
          if (amount.value === "") {
            this.amountError = true
          } else {
            this.amountError = false
            let index = this.obj
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