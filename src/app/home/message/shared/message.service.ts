import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  loadMessages():Observable<message[]>{
    let messages
    return
  }
}
