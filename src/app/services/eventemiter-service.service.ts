import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventemiterServiceService {

  constructor() { }
  myEvent = new EventEmitter();

  event(data:any){
    this.myEvent.emit(data)
  }
}
