import { Injectable } from '@angular/core';
import { Message, StompSubscription, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { SocketClientState } from './clientstate';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { link } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketclientService {

  private client: any; // This represent the web socket connection
  public state: BehaviorSubject<SocketClientState>; // This represents the web socket connection state

  
  constructor() {
    this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
  }


  // This changes the state from attempting to connected thereby only allowing the 
  // web socket client to be available whenever it is called. It is called on the dashboard page
  initiateSocket() {
      if (this.state.getValue() === 0){
        this.state = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
        this.client = Stomp.over(new SockJS(link.socket));
        this.client.connect({}, () => {
          this.state.next(SocketClientState.CONNECTED);
      });
      }
  }


  // This will return a web client connection when the initiateSocket() has been called.
  // This function won’t create a new WebSocket connection, and unsubscribing from 
  // this observable won’t disconnect.
  connect(): Observable<any> {
    return new Observable<any>(observer => {
      this.state.pipe(filter(state => state === SocketClientState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      });
    });
  }


  onMessage(topic: string, handler = SocketclientService.jsonHandler): Observable<any> {
    return this.connect().pipe(first(), switchMap(inst => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = inst.subscribe(topic, (message: Message) => {
          observer.next(handler(message)); // This is invoked on subscription to the observable
        });
        return () => inst.unsubscribe(subscription.id); // This is invoked on unsubscription from the observable
      });
    }));
  }

  
  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

}
