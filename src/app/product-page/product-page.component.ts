import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { ProductDataService } from '../services/product-data.service';
import { UserDataService } from '../services/user-data.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { SnackbarUtil } from 'src/utils/snackbar-util';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  qttValue: number = 0;
  errorMsg: string = '';
  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private navbarService: NavbarService,
    private authService: AuthServiceService,
    private userService: UserDataService,
    private snackbarUtil: SnackbarUtil
  ) {}

  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('productName');

    if (productName !== null) {
      const decodedProdName = decodeURIComponent(productName);
      const prodFormat = decodedProdName.replace(/-/g, ' ').toLowerCase();
      this.productService.getProduct('name', prodFormat).subscribe((resp) => {
        if (resp.body != null) {
          this.product = resp.body;
        }
      });
    }
  }

  checkQuantity(event: any) {
    const input = event.target;
    const value = parseFloat(input.value);

    if (isNaN(value) || value <= 0) {
      input.value = 1;
    }
  }

  addToCart(): void {
    const quantityValue = this.elementRef.nativeElement.querySelector('.qttValue');
    this.authService.checkUser().subscribe(
      (response) => {

        this.snackbarUtil.openSnackBar("Product added successfully!");
        this.userService
          .updateCart(response.userId, this.product.productId, parseInt(quantityValue.value), "add")
          .subscribe({
            next: (data) => {
              this.navbarService.setCartItems(0);
              this.navbarService.setCartItems(data.body.cartItems.length);
            },
          });
      },
      (error) => {
        console.log('Error obteniendo userId');
      }
    );
  }
  
  

  product!: IProduct;
  
}
