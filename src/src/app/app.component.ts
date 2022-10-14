import { Component } from '@angular/core';
import { TokenService } from './services/auth/token.service';
import { SocketService } from './services/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat app';
  constructor(private socket: SocketService, private token: TokenService){

  }
  ngOnInit() { 
    if(this.token.loggedIn()){
      this.socket.connect();
    }
  }

}
