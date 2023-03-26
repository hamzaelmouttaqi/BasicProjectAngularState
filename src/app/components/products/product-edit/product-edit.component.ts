import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.services';
import { ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  productformGroup!: FormGroup 
  
  submitted:boolean=false
  productId :number
  constructor(private fb:FormBuilder,private productservice:ProductsService,private activatedRoute:ActivatedRoute,
    private eventDrivenService:EventDriverService){
    this.productId=activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.productservice.getProduct(this.productId).subscribe(product=>{
      this.productformGroup =this.fb.group({
        id:[product.id],
        name:[product.name,[Validators.required]],
        price:[product.price,Validators.required],
        quantity:[product.quantity,Validators.required],
        selected:[product.selected,Validators.required],
        available:[product.available,Validators.required],
      })
    })
  }
  OnUpdateProduct() {
    console.log(this.productformGroup.value)
    this.productservice.updateproduct(this.productformGroup.value).subscribe(
      data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_UPDATED})
        alert("success updating")
      }
    )
    
  }

}