import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.authService.checkUser().subscribe({
      next: (user) => {
        this.products = user.cartItems;
        this.totalPrice += 5;
        this.products.forEach(product => {
          this.totalPrice += product.quantity * parseFloat(product.price.$numberDecimal);
          this.totalItems += product.quantity;
        });
        this.totalPrice = this.totalPrice.toFixed(2);
      },
    });
  }
  onDeleteProduct(product: IProduct): void {
    this.products = this.products.filter(
      (p) => p.productId !== product.productId
    );
  }

  onUpdatePrice(product: IProduct): void {
    this.totalPrice = 0;
    this.products.forEach((prod) => {
      if (prod.productId === product.productId) {
        prod.quantity = product.quantity;
      }
      this.totalPrice += prod.quantity * parseFloat(prod.price.$numberDecimal);
    });
    this.totalPrice += 5;
    this.totalPrice = this.totalPrice.toFixed(2);
  }

  onUpdateQuantity(quantity: number): void {    
    this.totalItems += quantity;
    this.totalPrice = 0;
    this.products.forEach((product) => {
      this.totalPrice += product.quantity * parseFloat(product.price.$numberDecimal);
    });
    this.totalPrice += 5;
    this.totalPrice = this.totalPrice.toFixed(2);
  }


  products: IProduct[] = [];
  totalPrice: any = 0;
  totalItems: number = 0;
}
