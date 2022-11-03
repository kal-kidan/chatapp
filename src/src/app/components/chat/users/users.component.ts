import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  recievers: any = [];
  keyword = new FormControl('');
  searchedUser: any = {};
  selectedUser: string = '';
  talkedUsers: any = []
  @Output () emitter: EventEmitter<Object> = new EventEmitter<Object> ();
  constructor(private requestService: RequestService, private socket: SocketService, private profileService: UserProfileService) {
    requestService.getReceivers(profileService.get().id!).subscribe((data: any)=>{
      this.recievers = data;
      this.talkedUsers = data;
    })
   }

  ngOnInit(): void {
  }

  openMessages(reciever: any){
    console.log(reciever);

    this.emitter.emit(reciever);
  }

  searchUser(){
    if (this.keyword.value) {
      this.searchedUser = {};
      this.requestService.searchUser(this.keyword.value).subscribe((searchResult)=>{
       this.recievers = searchResult;
      });
    }
    else{
      this.recievers = this.talkedUsers;
    }


  }


}
