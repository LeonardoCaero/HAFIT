import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  public urlProduct: String = '';
  constructor(
  
  ) {}

  ngOnInit(): void {

    this.urlProduct = this.product.name.replace(/\s+/g, '-');
    if (
      this.product.type == null ||
      this.product.type == '' ||
      this.product.type == undefined
    ) {
      this.product.type = 'supplement';
    }
  }

  @Input() product: IProduct = {} as IProduct;


  @ViewChild('bottomDiv') bottomDivRef!: ElementRef;
}
