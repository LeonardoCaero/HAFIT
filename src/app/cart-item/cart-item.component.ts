import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private authService: AuthServiceService,
    private userService: UserDataService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    const addButton = this.elementRef.nativeElement.querySelector('.addCart');
    const remButton = this.elementRef.nativeElement.querySelector('.remCart');
    if (this.product.image != null && this.product.image != '') {
    } else {
      this.product.image = environment.defaultImage;
    }

    addButton?.addEventListener('click', () => {
      this.authService.checkUser().subscribe(
        (response) => {
          this.userService
            .updateCart(response.userId, this.product.productId, 'add')
            .subscribe({
              next: (data) => {
                data.body.cartItems.forEach((elem: IProduct) => {
                  if ((elem.productId = this.product.productId)) {
                    this.productPrice =
                      parseFloat(elem.price.$numberDecimal) * elem.quantity;
                  }
                });
              },
            });
        },
        (error) => {
          console.log('Error obteniendo userId');
        }
      );
    });
    remButton?.addEventListener('click', () => {
      this.authService.checkUser().subscribe(
        (response) => {
          this.userService
            .updateCart(response.userId, this.product.productId, 'remove')
            .subscribe({
              next: (data) => {
                data.body.cartItems.forEach((elem: IProduct) => {
                  if ((elem.productId = this.product.productId)) {
                    this.productPrice =
                      parseFloat(elem.price.$numberDecimal) * elem.quantity;
                  }
                });
              },
            });
        },
        (error) => {
          console.log('Error obteniendo userId');
        }
      );
    });
    this.productPrice =
      this.product.quantity * parseFloat(this.product.price.$numberDecimal);
  }

  @Input()
  product!: IProduct;

  productPrice!: Number;
}
