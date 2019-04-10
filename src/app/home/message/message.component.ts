import { Component, OnInit } from '@angular/core';
import { Message } from './shared/message.model';
import { MessageService } from './shared/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  items: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.loadMessages().subscribe(ms => {
      this.items = ms;
    })
  }
  onClick() {

  }
  yy(){
    console.log("mousedown")
  }
  loadData(event) {
    setTimeout(() => {
      this.messageService.loadMessages().subscribe(ms => {
        ms.forEach(m => {
          this.items.push(m);
        })
      })
      event.target.complete();
    }, 500);
  }
}
