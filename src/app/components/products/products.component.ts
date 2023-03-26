import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ProductsService } from 'src/app/services/products.services';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{


  products$?:Observable<AppDataState<Product[]>> 
  readonly DataStateEnum=DataStateEnum
  constructor(private productsService:ProductsService, private router:Router,private eventDriverService:EventDriverService){}
  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
  }
  onGetAllProducts(){
    this.products$=this.productsService.getAllProducts().pipe(
      map((data)=>({dataState : DataStateEnum.LOADED , data : data})),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err=>of({dataState : DataStateEnum.ERROR,errorMessage :err.message }))
    );
  }
  onGetAvailableProducts() {
      this.products$=this.productsService.getAvailableProducts().pipe(
      map((data)=>({dataState : DataStateEnum.LOADED , data : data})),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err=>of({dataState : DataStateEnum.ERROR,errorMessage :err.message }))
    );
    
    }
    onGetSelectedProducts() {
      this.products$=this.productsService.getSelectedProducts().pipe(
        map((data)=>({dataState : DataStateEnum.LOADED , data : data})),
        startWith({dataState : DataStateEnum.LOADING }),
        catchError(err=>of({dataState : DataStateEnum.ERROR,errorMessage :err.message }))
      );
    }
    OnSearch(value: any) {
      this.products$=this.productsService.searchProducts(value.keyword).pipe(
        map((data)=>({dataState : DataStateEnum.LOADED , data : data})),
        startWith({dataState : DataStateEnum.LOADING }),
        catchError(err=>of({dataState : DataStateEnum.ERROR,errorMessage :err.message }))
      );
      }
      OnSelect(p: Product) {
        this.productsService.changeSelect(p).subscribe(
          data=>{
            p.selected=data.selected;
          }
        )
        }
      OnDelete(p: Product) {
        let v = confirm('are u sure ?')
        if(v){
          this.productsService.delete(p).subscribe(
            data=>{
              this.onGetAllProducts();
            }
          )
        }
      }   
      
      OnNewProduct() {
       this.router.navigateByUrl("/newproduct")
        }
      OnUpdate(p:Product) {
          this.router.navigateByUrl("/editproduct/"+p.id)
           }
      onActionEvent($event : ActionEvent){
        switch ($event.type) {
          case ProductActionsTypes.GET_ALL_PRODUCTS:
            this.onGetAllProducts()
            break;
          case ProductActionsTypes.GET_SELECTED_PRODUCTS:
            this.onGetSelectedProducts()
            break;
          case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
              this.onGetAvailableProducts()
              break;
          case ProductActionsTypes.SEARCH_PRODUCTS:
                this.OnSearch($event.payload)
                break;
          case ProductActionsTypes.NEW_PRODUCT:
                  this.OnNewProduct()
                  break;
          case ProductActionsTypes.SELECT_PRODUCT:
             this.OnSelect($event.payload) 
            break;
          case ProductActionsTypes.DELETE_PRODUCT:
             this.OnDelete($event.payload);
             break;
          case ProductActionsTypes.EDIT_PRODUCT:
             this.OnUpdate($event.payload);break;
          default:
            break;
        }
      }
}
