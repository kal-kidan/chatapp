import { Component } from '@angular/core';
import { TokenService } from './services/auth/token.service';
import { UserProfileService } from './services/auth/user-profile.service';
import { SocketService } from './services/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat app';
  user: any;
  constructor(private socket: SocketService, private token: TokenService, private userProfile: UserProfileService){
    this.user = this.userProfile.get();
  }
  ngOnInit() {
    if(this.token.loggedIn()){
      this.socket.connect();
      this.socket.join(this.user.id);
    }
  }

}
