import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iexercice } from '../interfaces/iexercice';

@Injectable({
  providedIn: 'root'
})
export class ExerciceDataService {

  constructor(private _http: HttpClient) { }
  exercices: Iexercice[] = [];
  
  public getExercices(): Observable<HttpResponse<any>>{
    return this._http.get(environment.apiUrl+'/exercice/all', { observe: 'response' });
  }
  public getExercice(searchBy: string, data: any): Observable<HttpResponse<any>> {
    const url = `${environment.apiUrl}/exercice/search?search=${searchBy}&data=${data}`;
    return this._http.get(url, { observe: 'response' });
  }
  public updateExercice(id:any,dada:any,description:string,featuredImg:any): Observable<HttpResponse<Iexercice[]>> {
    return this._http.put<Iexercice[]>(environment.apiUrl+'/exercice/edit?name='+dada.get('name')+'&exerciceId='+id+'&description='+description+'&time='+dada.get('time')+'&featuredImg='+featuredImg,dada,{ observe: 'response' });
  }
  public updateViews(id:any,view:any): Observable<HttpResponse<any>> {
    return this._http.put<any>(environment.apiUrl+'/exercice/edit?view='+view+'&exerciceId='+id,{observe:'response'});
  }
  public deleteExercice(deleteBy: any, data: any): Observable<HttpResponse<any>>{
    const url = `${environment.apiUrl}/exercice/delete?deleteBy=${deleteBy}&data=${data}`;
    return this._http.delete(url, { observe: 'response' });
  }
  public addExercice(name:any,description:any,featuredImg:any,time:any): Observable<HttpResponse<any>>{
    const body = { name: name, description: description, featuredImg: featuredImg,time:time};
    return this._http.post<any>(environment.apiUrl+'/exercice/add',body,{observe: 'response'});
  }
  public updateUser(userId: any, exerciceId: any): Observable<HttpResponse<any>> {
    const body = { userId: userId, exerciceId: exerciceId};
    return this._http.put(`${environment.apiUrl}/exercice/users`, body, { observe: 'response' });
  }
}
