import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{

  @Input() p!:Product;
  //@Output() eventEmitter:EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService:EventDriverService){}
  ngOnInit(): void {
  }
  OnSelect(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SELECT_PRODUCT,payload:product});
  }

  OnDelete(product: Product) {
    //this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.DELETE_PRODUCT,payload:product});
  }

  OnUpdate(product: Product) {
   // this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.EDIT_PRODUCT,payload:product});
  }
}
