import { Component, OnInit } from '@angular/core';
import { message } from './shared/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  items:message[]=[];
  constructor() { }

  ngOnInit() {

    var a=1;
    console.log("666")
  }
  onClick(){
    
  }
  myHeaderFn(record, recordIndex, records) {
    if (recordIndex % 20 === 0) {
      return 'Header ' + recordIndex;
    }
    return null;
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      
   
      event.target.complete();
     
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
   
    }, 500);
  }
}
