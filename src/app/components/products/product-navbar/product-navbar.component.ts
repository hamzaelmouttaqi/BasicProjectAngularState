import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-navbar',
  templateUrl: './product-navbar.component.html',
  styleUrls: ['./product-navbar.component.css']
})
export class ProductNavbarComponent implements OnInit{

  //@Output() eventemitter : EventEmitter<ActionEvent> = new EventEmitter()

  constructor(private eventDriverService:EventDriverService){

  }
  ngOnInit(): void {
  }
  onGetAllProducts(){
    //this.eventemitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS})
  }
  onGetSelectedProducts(){
    //this.eventemitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
  }
  onGetAvailableProducts(){
    //this.eventemitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});

  }
  OnNewProduct(){
    //this.eventemitter.emit({type:ProductActionsTypes.NEW_PRODUCT})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT});
  }
  OnSearch(f:any){
    //this.eventemitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:f})
    this.eventDriverService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:f});
  }
  
}
