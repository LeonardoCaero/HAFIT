import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http: HttpClient) { }

  users: IUser[] = [];

  public getUsers(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiUrl}/user/all`, { observe: 'response' });
  }

  public getUser(searchValue: any, value: any): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.apiUrl}/user/search?search=${searchValue}&data=${value}`, { observe: 'response' });
  }

  public addUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.post(`${environment.apiUrl}/user/add`, user, { observe: 'response' });
  }

  public updateUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.put(`${environment.apiUrl}/user/edit?userId=${user.userId}`, user, { observe: 'response' });
  }
  public updateUserType(user: IUser): Observable<HttpResponse<any>> {
    return this._http.put(`${environment.apiUrl}/user/edit?userId=${user.userId}&type=${user.type}`, user, { observe: 'response' });
  }
  
  public updateCart(userId: any, productId: any, action: string): Observable<HttpResponse<any>> {
    const body = { userId: userId, productId: productId, action: action };
    return this._http.put(`${environment.apiUrl}/user/cart`, body, { observe: 'response' });
  }

  public updatePlan(userId: any, planId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, planId: planId};
    return this._http.put(`${environment.apiUrl}/user/plans`, body, { observe: 'response' });
  }

  public updateExercice(userId: any, exerciceId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, exerciceId: exerciceId};
    return this._http.put(`${environment.apiUrl}/user/exercices`, body, { observe: 'response' });
  }

  public deletePlan(userId: any, planId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, planId: planId};
    return this._http.put(`${environment.apiUrl}/user/deletePlans`, body, { observe: 'response' });
  }
  public deleteExercice(userId: any, exerciceId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, exerciceId: exerciceId};
    return this._http.put(`${environment.apiUrl}/user/deleteExercices`, body, { observe: 'response' });
  }
}