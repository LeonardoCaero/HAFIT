import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { ProductDataService } from '../services/product-data.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private navbarService: NavbarService,
    private authService: AuthServiceService,
    private userService: UserDataService
  ) {}

  ngOnInit(): void {
    const cartButton = this.elementRef.nativeElement.querySelector('.addcart');
    const planName = this.route.snapshot.paramMap.get('productName');

    if (planName !== null) {
      const decodedPlanName = decodeURIComponent(planName);
      const planFormat = decodedPlanName.replace(/-/g, ' ').toLowerCase();
      this.productService.getProduct('name', planFormat).subscribe((resp) => {
        if (resp.body != null) {
          console.log(resp.body);
          this.product = resp.body;

          cartButton?.addEventListener('click', () => {
            // bottomDiv?.classList.add('clicked');
            this.authService.checkUser().subscribe(
              (userId) => {
                const cartItems = this.navbarService.getCartItems(userId);
                this.navbarService.setCartItems(cartItems + 1);
                this.userService
                  .updateCart(userId, this.product.productId, 'add')
                  .subscribe({
                    next: (data) => {
                      console.log(data);
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

  product!: IProduct;
}
