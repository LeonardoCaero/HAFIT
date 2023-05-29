import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { UserDataService } from '../services/user-data.service';
import { switchMap, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { NavbarService } from '../services/navbar.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  public urlProduct: String = '';
  constructor(
    private authService: AuthServiceService,
    private userService: UserDataService,
    private elementRef: ElementRef,
    private navbarService: NavbarService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.product) {
      const addButton = this.elementRef.nativeElement.querySelector('.addButton');
      const remButton = this.elementRef.nativeElement.querySelector('.remButton');
      const deleteButton = this.elementRef.nativeElement.querySelector('.deleteBtn');
      const qttValue = this.elementRef.nativeElement.querySelector('.qttValue');
      this.urlProduct = this.product.name.replace(/\s+/g, '-');

      if (addButton && remButton && qttValue && deleteButton) {
        if (this.product.image == null || this.product.image === '') {
          this.product.image = environment.defaultImage;
        }

        this.productPrice = (
          parseFloat(this.product.price.$numberDecimal) * this.product.quantity
        ).toFixed(2);

        fromEvent(addButton, 'click')
          .pipe(
            switchMap(() => {
              return this.authService.checkUser();
            }),
            switchMap((response: any) => {
              return this.userService.updateCart(
                response.userId,
                this.product.productId,
                1,
                'add'
              );
            })
          )
          .subscribe((data: any) => {
            this.updatePrice(data);
            this.updatedQuantity.emit(1);
          });

        fromEvent(remButton, 'click')
          .pipe(
            switchMap(() => this.authService.checkUser()),
            switchMap((response: any) => {
              return this.userService
                .updateCart(
                  response.userId,
                  this.product.productId,
                  1,
                  'remove'
                )
                .pipe(
                  tap((data: any) => {
                    this.updatePrice(data);
                    this.updatedQuantity.emit(-1);
                  })
                );
            })
          )
          .subscribe((data: any) => {
              
          });

        fromEvent(deleteButton, 'click')
          .pipe(
            switchMap(() => {
              return this.authService.checkUser();
            }),
            switchMap((response: any) => {
              return this.userService.updateCart(
                response.userId,
                this.product.productId,
                this.product.quantity,
                'remove'
              ).pipe(
                tap((data: any) => {
                  this.navbarService.getCartItems();
                })
              );
            })
          )
          .subscribe((data: any) => {
            this.deleteProduct.emit(this.product);
            
            this.updatedQuantity.emit(-this.product.quantity);            
          });
      }
    }
  }
  

  updatePrice(data: any): void {
    data.body.cartItems.forEach((elem: IProduct) => {
      if (elem.productId === this.product.productId) {
        console.log(elem.quantity);
        this.productPrice = (
          parseFloat(elem.price.$numberDecimal) * elem.quantity
        ).toFixed(2);
        this.updatedPrice.emit(elem);        
      }
    });
  }

  @Input() product!: IProduct;

  @Output() deleteProduct = new EventEmitter<IProduct>();

  @Output() updatedPrice = new EventEmitter<any>();
  @Output() updatedQuantity = new EventEmitter<any>();

  productPrice!: string;
}
