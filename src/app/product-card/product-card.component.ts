import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/iproduct';
import { AuthServiceService } from '../services/auth-service.service';
import { NavbarService } from '../services/navbar.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  public urlProduct: String = '';
  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private navbarService: NavbarService,
    private route: ActivatedRoute,
    private userService: UserDataService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (this.product.image != null && this.product.image != '') {
      this.productImage = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.product.image}`
      );
    } else {
      this.productImage = environment.defaultImage;
    }

    const buyButton = this.elementRef.nativeElement.querySelector('.buy');
    const removeButton = this.elementRef.nativeElement.querySelector('.remove');
    const bottomDiv = this.elementRef.nativeElement.querySelector('.bottom');

    buyButton?.addEventListener('click', () => {
      const cartItems = this.navbarService.getCartItems();
      this.navbarService.setCartItems(cartItems + 1);
      bottomDiv?.classList.add('clicked');
      this.authService.checkUser().subscribe(
        (userId) => {
          this.userService.updateCart(userId, this.product.productId, 'add').subscribe({
            next: (data) => {
              console.log(data);
            }
          });
        },
        (error) => {
          console.log('Error obteniendo userId');
        }
      );
    });

    removeButton?.addEventListener('click', () => {
      const cartItems = this.navbarService.getCartItems();
      this.navbarService.setCartItems(cartItems - 1);
      bottomDiv?.classList.remove('clicked');
      this.authService.checkUser().subscribe(
        (userId) => {
          this.userService.updateCart(userId, this.product.productId, 'remove').subscribe({
            next: (data) => {
              console.log(data);
            }
          });
        },
        (error) => {
          console.log('Error obteniendo userId');
        }
      );
    });

    this.urlProduct = this.product.name.replace(/\s+/g, '-').toLowerCase();
    if (
      this.product.type == null ||
      this.product.type == '' ||
      this.product.type == undefined
    ) {
      this.product.type = 'supplement';
    }
  }

  @Input()
  product!: IProduct;
  productImage: any;

  @ViewChild('bottomDiv') bottomDivRef!: ElementRef;
}
