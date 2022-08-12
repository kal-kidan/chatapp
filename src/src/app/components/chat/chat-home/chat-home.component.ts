import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { RequestService } from 'src/app/services/request.service';
import * as moment from 'moment';
@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {
  recievers: any = [];
  messages: any = [];
  userName: string='';
  id: any;
  moment = moment;
  constructor(private requestService: RequestService, private profileService: UserProfileService) {
    this.id= profileService.get().id;
    requestService.getReceivers(this.id!).subscribe((data: any)=>{
      this.recievers = data;
    })
   }
  ngOnInit(): void { 
  }
  openMessages(reciever: any){
    this.userName = reciever.user.name;
    this.requestService.getMessages(reciever._id, 1, 10).subscribe((data: any)=>{
      this.messages = data.docs;
    })
  }

}
