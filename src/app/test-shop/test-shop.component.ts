import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-test-shop',
  templateUrl: './test-shop.component.html',
  styleUrls: ['./test-shop.component.scss']
})
export class TestShopComponent implements OnInit {
  public data: any;
  public headers: HttpHeaders | undefined;

  constructor(private productService: ProductDataService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(resp => {
      if (resp.body != null) {
        console.log(resp.body);
        this.products = resp.body;
      }
    });
  }

  products: IProduct[] = [];
}
