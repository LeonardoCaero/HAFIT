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
    return this._http.get(environment.apiUrl+'plan/all', { observe: 'response' });
  }
  public getPlan(data:any): Observable<HttpResponse<IPlan[]>>{
    return this._http.get<IPlan[]>(environment.apiUrl+'plan/'+data, { observe: 'response' });
  }
  public updatePlans(dada:any): Observable<HttpResponse<IPlan[]>> {
    return this._http.put<IPlan[]>(environment.apiUrl+'plan/edit/',dada,{ observe: 'response' });
  }
  public deletePlan(deleteBy:any,data:any):  Observable<HttpResponse<IPlan[]>>{
    return this._http.delete<IPlan[]>(environment.apiUrl+'plan/delete?deleteBy='+deleteBy+'&data='+data, { observe: 'response' });
  }
}
