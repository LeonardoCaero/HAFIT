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
    return this._http.get(environment.apiUrl+'product/all', { observe: 'response' });
  }
  deleteProduct(deleteBy: string, data: any): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}product/delete?deleteBy=${deleteBy}&data=${data}`;
    return this._http.delete(url, { observe: 'response' });
  }
  

  getProduct(searchBy: string, data: any): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}product/search?search=${searchBy}&data=${data}`;
    return this._http.get(url, { observe: 'response' });
  }
}


