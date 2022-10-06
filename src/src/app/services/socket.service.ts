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
  }

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message: any) =>{
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}
