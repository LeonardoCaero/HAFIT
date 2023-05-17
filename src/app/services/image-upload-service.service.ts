import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadServiceService {

  constructor(private http: HttpClient) { }

  uploadImage(file:any): Observable<any> {
    let data = file;
    return this.http.post(`https://api.cloudinary.com/v1_1/${environment.CLOUD_NAME}/image/upload`,data)
  }
}
