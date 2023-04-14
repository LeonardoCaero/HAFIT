import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../interfaces/iproduct';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private productService: ProductDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const planName = this.route.snapshot.paramMap.get('productName');
    if (planName !== null) {
      const decodedPlanName = decodeURIComponent(planName);
      const planFormat = decodedPlanName.replace(/-/g, ' ').toLowerCase();
      this.productService.getProduct('name', planFormat).subscribe((resp) => {
        if (resp.body != null) {
          console.log(resp.body);
          this.product = resp.body;
        }
      });
    } else {

    }

    
  }

  product!: IProduct;
}

