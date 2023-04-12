import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private cartItemsSource = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() { }

  getCartItems() {
    return this.cartItemsSource.getValue();
  }

  setCartItems(value: number) {
    this.cartItemsSource.next(value);
  }
}
