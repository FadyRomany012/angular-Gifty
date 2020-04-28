import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild("file",{static:false}) file:ElementRef
  displayedColumns: string[] = ['price', 'seller',"imgUrl", 'save',"delete"];
dataSource

  container:Product[]=[]
adminForm = new FormGroup({
  description:new FormControl('',Validators.required),
  seller:new FormControl('',Validators.required),
  imgUrl:new FormControl('',Validators.required),
  price:new FormControl('',Validators.required),
  category:new FormControl('',Validators.required)
})
  constructor(private _ProductsService:ProductsService,
    private _Router:Router,
    public _AuthService:AuthService) { }

  ngOnInit() {
  this._ProductsService.getProductsToAdmin().subscribe(data => {
   this.container = data.map(da => {
     return {
       id:da.payload.doc.id,
       ...da.payload.doc.data()
     }
   })
   this.dataSource = new MatTableDataSource(this.container);
    })
   
  }
  add(adminForm) {
    let description=(<Product>adminForm.value).description
    let seller=(<Product>adminForm.value).seller
    let imgUrl=(this.file.nativeElement as HTMLInputElement).files[0]
    let price=(<Product>adminForm.value).price
    let category=(<Product>adminForm.value).category
    this._ProductsService.addProduct(description,price,seller,imgUrl,category)
    this._Router.navigate(["/home"])
  }
  deleteItem(element) {
    this._ProductsService.deleteProduct(element.id)
  }
  updateProduct(element) {
   this._ProductsService.updateProduct(element.price,element.id)
  }

}
