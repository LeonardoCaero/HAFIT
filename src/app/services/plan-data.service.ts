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
  public updatePlans(id:any,name:string,description:any,featuredImage:any,dada:any): Observable<HttpResponse<any>> {
    return this._http.put<any>(environment.apiUrl+'/plan/edit?name='+dada.get('name')+'&planId='+id+'&description='+description+'&featuredImg='+featuredImage,dada,{observe:'response'});
    // return this._http.put(environment.apiUrl+'/plan/edit',body,{ observe: 'response' });
  }
  public deletePlan(deleteBy: any, data: any): Observable<HttpResponse<any>>{
    const url = `${environment.apiUrl}/plan/delete?deleteBy=${deleteBy}&data=${data}`;
    return this._http.delete(url, { observe: 'response' });
  }
  public addPlan(name:any,featuredImg:any,description:any): Observable<HttpResponse<any>>{
    const body = { name: name, description: description, featuredImg: featuredImg};
    return this._http.post<any>(environment.apiUrl+'/plan/add',body,{observe: 'response'});
  }

  public updateUser(userId: any, planId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, planId: planId};
    return this._http.put(`${environment.apiUrl}/plan/users`, body, { observe: 'response' });
  }
 

}
