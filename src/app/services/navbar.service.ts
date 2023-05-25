import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private cartItemsSource = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor(private authService: AuthServiceService) {}

  getCartItems() {
    this.authService.checkUser().subscribe(
      (response) => {      
        const cartItems = response.userResponse.cartItems.length;
        this.setCartItems(cartItems);
        return this.setCartItems(cartItems);
      }
    );
    return this.cartItemsSource.getValue();
  }

  setCartItems(value: number) {
    this.cartItemsSource.next(value);
  }
  getUserId(){
    this.authService.checkUser().subscribe(
      (response)=>{
        const userId = response.userId
        console.log(userId);
        
      }
    )
  }
}