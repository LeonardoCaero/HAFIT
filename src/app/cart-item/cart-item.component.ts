import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit{


  constructor(){}

  ngOnInit(): void {
    if(this.product.image != null && this.product.image != ''){
      
    } else {
      this.product.image = environment.defaultImage;
    }
    
  }

  @Input()
  product!: IProduct;
}
