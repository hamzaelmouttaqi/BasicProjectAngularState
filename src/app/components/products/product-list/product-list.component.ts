import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() productsInput$?:Observable<AppDataState<Product[]>> 
  // @Output() productsEventEmitter:EventEmitter<ActionEvent> = new EventEmitter()

  readonly DataStateEnum=DataStateEnum
  ngOnInit(): void {
    
  }
  // OnSelect(p: Product) {
  //   this.productsEventEmitter.emit({
  //     type: ProductActionsTypes.SELECT_PRODUCT,payload:p
  //   });
  // }

  // OnDelete(p: Product) {
  //   this.productsEventEmitter.emit({
  //     type: ProductActionsTypes.DELETE_PRODUCT,payload:p
  //   });
  // }

  // OnUpdate(p: Product) {
  //   this.productsEventEmitter.emit({
  //     type: ProductActionsTypes.EDIT_PRODUCT,payload:p
  //   });
  // }

  // onActionEvent($event: ActionEvent) {
  //   this.productsEventEmitter.emit($event);
  // }
}



