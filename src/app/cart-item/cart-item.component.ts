import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { UserDataService } from '../services/user-data.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @ViewChild('addButton') addButton!: ElementRef | undefined;
  @ViewChild('remButton') remButton!: ElementRef | undefined;

  constructor(
    private authService: AuthServiceService,
    private userService: UserDataService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    if (this.product.image == null || this.product.image === '') {
      this.product.image = environment.defaultImage;
    }

    const addClick$ = this.addButton?.nativeElement.click$;
    const remClick$ = this.remButton?.nativeElement.click$;

    addClick$
      .pipe(
        switchMap(() => this.authService.checkUser()),
        switchMap((response: any) =>
          this.userService.updateCart(
            response.userId,
            this.product.productId,
            'add'
          )
        )
      )
      .subscribe((data: any) => {
        data.body.cartItems.forEach((elem: IProduct) => {
          if (elem.productId === this.product.productId) {
            this.productPrice = (
              parseFloat(elem.price.$numberDecimal) * elem.quantity
            ).toFixed(2);
          }
        });
      });

    remClick$
      .pipe(
        switchMap(() => this.authService.checkUser()),
        switchMap((response: any) =>
          this.userService.updateCart(
            response.userId,
            this.product.productId,
            'remove'
          )
        )
      )
      .subscribe((data: any) => {
        data.body.cartItems.forEach((elem: IProduct) => {
          if (elem.productId === this.product.productId) {
            this.productPrice = (
              parseFloat(elem.price.$numberDecimal) * elem.quantity
            ).toFixed(2);
          }
        });
      });

    this.productPrice = (
      this.product.quantity * parseFloat(this.product.price.$numberDecimal)
    ).toFixed(2);
  }

  @Input() product!: IProduct;
  productPrice!: string;
}
