import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io, Socket } from "socket.io-client";

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: Socket;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  connect(){
    this.socket = io("localhost:3000");
    this.socket.on('message', this.getNewMessage);
  }

  public sendMessage(data: any) {
    this.socket.emit('send', data);
  }

  public getNewMessage = (message: any) =>{
    console.log("message", message);
  }

  public join(id: any){
    this.socket.emit('join', id);
  }

  public getSocket(){
    return this.socket;
  }

}
