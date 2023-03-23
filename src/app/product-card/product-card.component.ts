import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.product.image != null || this.product.image != '') {
      this.productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.product.image}`
      );
    } else {
      this.product.image = environment.defaultImage;
    }
  }

  @Input()
  product!: IProduct;

  productImage: any;
}
