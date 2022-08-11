import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {
  recievers: any = [];
  constructor(private requestService: RequestService, private profileService: UserProfileService) {
    const {id} = profileService.get();
    requestService.getReceivers(id!).subscribe((data: any)=>{
      this.recievers = data;
    })
   }
  ngOnInit(): void {
  }

}
