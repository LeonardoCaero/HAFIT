import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  public urlProduct: String = '';
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // if (this.product.image != null && this.product.image != '') {
    //   this.productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
    //     `${this.product.image}`
    //   );
    // } else {
    //   this.productImage = environment.defaultImage;
    // }    

    this.urlProduct = this.product.name.replace(/\s+/g, '-');
    if (
      this.product.type == null ||
      this.product.type == '' ||
      this.product.type == undefined
    ) {
      this.product.type = 'supplement';
    }
  }

  @Input()
  product!: IProduct;
  productImage: any;

  @ViewChild('bottomDiv') bottomDivRef!: ElementRef;
}
