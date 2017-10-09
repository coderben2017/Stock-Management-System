import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  messageCount: number = 0;

  constructor(public socketservice: SocketService) { }

  ngOnInit() {
    this.socketservice.createObservableSoctet('ws://localhost:8085')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      );
  }

}
