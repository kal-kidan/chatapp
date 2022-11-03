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
  email = new FormControl('');
  searchedUser: any = {};
  selectedUser: string = '';
  @Output () emitter: EventEmitter<Object> = new EventEmitter<Object> ();
  constructor(private requestService: RequestService, private socket: SocketService, private profileService: UserProfileService) {
    requestService.getReceivers(profileService.get().id!).subscribe((data: any)=>{
      this.recievers = data;
    })
   }

  ngOnInit(): void {
  }

  openMessages(reciever: any){
    this.emitter.emit(reciever);
  }

  searchUser(){
    this.searchedUser = {};
    this.recievers = this.recievers.filter((currentUser: any)=> {
      if (currentUser.user.email == this.email.value) {
        this.searchedUser = currentUser
        return false;
      }
      else{
        return true;
      }
    });

    if(Object.keys(this.searchedUser).length == 0){
      this.requestService.searchUser(this.email.value).subscribe((searchResult)=>{
        this.searchedUser = {user: searchResult};
      });
    }
  }


}
