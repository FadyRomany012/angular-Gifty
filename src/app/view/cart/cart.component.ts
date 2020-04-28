import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interfaces/product';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartContainer:Product[]=[]
displayedColumns: string[] = ['price', 'amount', 'seller',"imgUrl", 'save',"delete"];
dataSource
done=false
total=0
cartLength=0

  constructor(private _CartSrvice:CartService,private _Title:Title,
    public _AuthService:AuthService) {
     this._Title.setTitle("Cart")
   
   }

  ngOnInit() {
  
 this._CartSrvice.getCart().subscribe(data => {
   this.total=0
   this.cartLength=0
this.cartContainer = data.map(dat => {
   return {
     id:dat.payload.doc.id,
     ...dat.payload.doc.data()
   }  
})
this.dataSource = new MatTableDataSource(this.cartContainer);
for (let i = 0;i<this.cartContainer.length;i++) {
  this.total += this.cartContainer[i].price * this.cartContainer[i].amount
  this.cartLength +=  this.cartContainer[i].amount
}
console.log(this.cartContainer)
  })
 
  
  
  }

  deleteItem(e) {
  this._CartSrvice.deleteItem(e.id)

  }
  updateCart(e) {

        this._CartSrvice.updateCart(e.id,e.amount)
        .then(() => {
          this.done=true
          setTimeout(() => {this.done=false},2000)
        })
  }

}
