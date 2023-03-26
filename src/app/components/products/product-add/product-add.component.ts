import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.services';
import { ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit{
  productformGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    selected: new FormControl(true),
    available : new FormControl(true),
  });
  
  submitted:boolean=false
  constructor(private fb:FormBuilder,private productservice:ProductsService,private eventDrivenService:EventDriverService){}
  ngOnInit(): void {
    this.productformGroup =this.fb.group({
      name:['',[Validators.required]],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],
    })
  }
  OnAddProduct() {
    this.submitted=true
    if (this.productformGroup.invalid) {
      return
    }
    if(this.productformGroup.value){
      this.productservice.addproduct(this.productformGroup.value).subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionsTypes.PRODUCT_ADDED})
        alert("succes operation")
      })
    }
    
  }

}
