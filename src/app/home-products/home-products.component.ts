import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { ProductDataService } from '../services/product-data.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit{
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
