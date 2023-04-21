import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{


  constructor(private authService: AuthServiceService){}

  ngOnInit(): void {
    this.authService.checkUser().subscribe({
      next: (user) => {
        this.products = user.cartItems;
      }
    })
  }

  products: IProduct[] = [];
}