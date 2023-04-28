import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http: HttpClient) { }

  users: IUser[] = [];

  public getUsers(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiUrl}user/all`, { observe: 'response' });
  }

  public getUser(searchValue: any, value: any): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiUrl}user/search?search=${searchValue}&data=${value}`, { observe: 'response' });
  }

  public addUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.post('${environment.apiUrl}user/add', user, { observe: 'response' });
  }

  public updateUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.put(`h${environment.apiUrl}user/edit?userId=${user.userId}`, user, { observe: 'response' });
  }
  
  public updateCart(userId: any, productId: any, action: string): Observable<HttpResponse<any>> {
    const body = { userId: userId, productId: productId, action: action };
    return this._http.put(`${environment.apiUrl}user/cart`, body, { observe: 'response' });
  }

 
}
