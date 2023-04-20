import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private cartItemsSource = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor(private userService: UserDataService) {}

  getCartItems(userId: string) {
    this.userService.getUser('userId', userId).subscribe((response) => {
      const currentUser = response.body[0];
      const cartItems = currentUser.cart.length;
      this.cartItemsSource.next(cartItems);
    });
    return this.cartItemsSource.getValue();
  }

  setCartItems(value: number) {
    this.cartItemsSource.next(value);
  }
}
