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
  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.product.image != null && this.product.image != '') {
      this.productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.product.image}`
      );
    } else {
      this.productImage = environment.defaultImage;
    }

    const buyButton = this.elementRef.nativeElement.querySelector('.buy');
    const removeButton = this.elementRef.nativeElement.querySelector('.remove');
    const bottomDiv = this.elementRef.nativeElement.querySelector('.bottom');

    buyButton?.addEventListener('click', () => {
      bottomDiv?.classList.add('clicked');
    });

    removeButton?.addEventListener('click', () => {
      bottomDiv?.classList.remove('clicked');
    });
  }

  @Input()
  product!: IProduct;

  productImage: any;

  @ViewChild('bottomDiv') bottomDivRef!: ElementRef;
}
