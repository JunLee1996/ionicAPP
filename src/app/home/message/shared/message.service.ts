import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  loadMessages():Observable<Message[]>{
    let messages=[];
    let message:Message={
      avatar:'免贵姓李',
      source:'user',
      text:'一条小团团',
      dataTime:new Date,
      status:'',
      messageCount:2,
      selectedColor:undefined,
    }
    for(let i=0;i<20;i++){
      messages.push(message);
    }
    return of(messages)
  }
}
