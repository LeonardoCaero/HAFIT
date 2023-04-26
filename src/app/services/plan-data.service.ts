import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { IPlan } from '../interfaces/iplan';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanDataService {

  constructor(private _http: HttpClient) { }
  plans:  IPlan[] = [];

  public getPlans(): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+'/plan/all', { observe: 'response' });
  }
  public getPlan(searchBy: string, data: any): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/plan/search?search=${searchBy}&data=${data}`;
    return this._http.get(url, { observe: 'response' });
  }
  public updatePlans(id:any,dada:any): Observable<HttpResponse<IPlan[]>> {
    return this._http.put<IPlan[]>(environment.apiUrl+'/plan/edit?name='+dada.get('name')+'&planId='+id+'&description='+dada.get('description')+'&featuredImg='+dada.get('featuredImg'),dada,{ observe: 'response' });
  }
  public deletePlan(deleteBy: any, data: any): Observable<HttpResponse<any>>{
    const url = `${environment.apiUrl}/plan/delete?deleteBy=${deleteBy}&data=${data}`;
    return this._http.delete(url, { observe: 'response' });
  }
  public addPlan(data:any): Observable<HttpResponse<any>>{
    return this._http.post<any>(environment.apiUrl+'/plan/add?name='+data.get('name')+'&description='+data.get('description'),{observe: 'response'});
  }
  public uploadImage(data:any): Observable<HttpResponse<any>>{
    return this._http.post<any>(environment.apiUrl+'/plan/uploadImages?featuredImg='+data,{observe: 'response'});
  }
}
