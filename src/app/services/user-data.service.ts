import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _http: HttpClient) { }

  users: IUser[] = [];

  public getUsers(): Observable<HttpResponse<any>> {
    return this._http.get('http://localhost:8000/api/user/all', { observe: 'response' });
  }

  public getUser(searchValue: any, value: any): Observable<HttpResponse<any>> {
    return this._http.get(`http://localhost:8000/api/user/search?search=${searchValue}&data=${value}`, { observe: 'response' });
  }

  public addUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.post('http://localhost:8000/api/user/add', user, { observe: 'response' });
  }

  public updateUser(user: IUser): Observable<HttpResponse<any>> {
    return this._http.put(`http://localhost:8000/api/user/edit?userId=${user.userId}`, user, { observe: 'response' });
  }
  
}
