import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { ProductDataService } from '../services/product-data.service';
import { UserDataService } from '../services/user-data.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const cartButton = this.elementRef.nativeElement.querySelector('.addcart');
    const quantityValue = this.elementRef.nativeElement.querySelector('.qttValue');
    const planName = this.route.snapshot.paramMap.get('productName');


    if (planName !== null) {
      const decodedPlanName = decodeURIComponent(planName);
      const planFormat = decodedPlanName.replace(/-/g, ' ').toLowerCase();
      this.productService.getProduct('name', planFormat).subscribe((resp) => {
        if (resp.body != null) {
          console.log(resp.body);
          this.product = resp.body;

          cartButton?.addEventListener('click', () => {
            this.authService.checkUser().subscribe(
              (response) => {
                this.navbarService.setCartItems(0);
                this.openSnackBar();
                this.userService
                  .updateCart(response.userId, this.product.productId, quantityValue.value, "add")
                  .subscribe({
                    next: (data) => {
                      this.navbarService.setCartItems(data.body.cartItems.length);
                    },
                  });
              },
              (error) => {
                console.log('Error obteniendo userId');
              }
            );
          });
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
  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.panelClass = ['my-snackbar'];
    config.duration = 1500;
    this.snackBar.open('Product added succesfully', 'Close', config);
  } 

  

  product!: IProduct;
  
}
