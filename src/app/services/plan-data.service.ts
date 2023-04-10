import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IPlan } from '../interfaces/iplan';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {

  constructor(private _http: HttpClient) { }
  plans:  IPlan[] = [];

  public getPlans(): Observable<HttpResponse<any>>{
    return this._http.get('http://localhost:8000/api/plan/all', { observe: 'response' });
  }
}
