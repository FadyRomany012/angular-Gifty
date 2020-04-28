import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

import { Title } from "@angular/platform-browser";
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = []
  amountError = -1
  isAdmin
  adminError=-1
 
  constructor(private _ProductService: ProductsService,
    private _Title: Title,
    private _CartService: CartService,
    public _AuthService: AuthService,
    private _Router: Router,
    private _User:UserService) { this._Title.setTitle("Home")

  }

  ngOnInit() {
     this._ProductService.getProducts().subscribe(data => {
      this.products = data
      console.log(this.products)
    
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
