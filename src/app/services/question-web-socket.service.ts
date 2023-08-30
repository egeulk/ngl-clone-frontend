import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environments';
import { RxStomp } from "@stomp/rx-stomp";
import { RxStompService } from '@stomp/ng2-stompjs';



@Injectable({
  providedIn: 'root'
})
export class QuestionWebSocketService {

  //private socket: WebSocket;
  private questionSubject: Subject<any> = new Subject<any>();
  private rxStomp : RxStomp = new RxStomp();

  constructor() {
    this.rxStomp.configure({
    brokerURL: environment.wsUrl,
  });
  this.rxStomp.activate();
  //rxStompService.activate();
  }
  

  getBookUpdates() : Observable<any>{
    return this.rxStomp.watch({ destination: "/topic/newQuestion" });
  }

  disconnect() {
    this.rxStomp.stompClient.deactivate();
  }

  connect() {
    this.rxStomp.stompClient.activate();
  }

}
