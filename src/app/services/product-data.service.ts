import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(private _http: HttpClient) {}

  products: IProduct[] = [];

  public getProducts(): Observable<HttpResponse<any>> {
    return this._http.get('http://localhost:8000/api/product/all', { observe: 'response' });
  }
}


