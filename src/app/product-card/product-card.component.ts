import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  public urlProduct: String = '';
  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private navbarService: NavbarService
  ) {}

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
      const cartItems = this.navbarService.getCartItems();
      this.navbarService.setCartItems(cartItems + 1);
      bottomDiv?.classList.add('clicked');
    });

    removeButton?.addEventListener('click', () => {
      const cartItems = this.navbarService.getCartItems();
      this.navbarService.setCartItems(cartItems - 1);
      bottomDiv?.classList.remove('clicked');
    });

    this.urlProduct = this.product.name.replace(/\s+/g, '-').toLowerCase();
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
