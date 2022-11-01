import { Component, OnInit } from '@angular/core';
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
  messages: any = [];
  userName: string='';
  id: any;
  email = new FormControl('');
  searchedUser: any = {};
  selectedUser: string = '';
  selectedRoomId: string = '';
  currentMessagePage = 1;
  constructor(private requestService: RequestService, private socket: SocketService, private profileService: UserProfileService) {
    this.id= profileService.get().id;
    requestService.getReceivers(this.id!).subscribe((data: any)=>{
      this.recievers = data;
    })
    if(this.socket.getSocket()){
      this.socket.getSocket().on('message', (data)=>{
        this.messages.push(data);
      });
    }
   }

  ngOnInit(): void {
  }

  openMessages(reciever: any){
    this.currentMessagePage = 1;
    this.selectedUser = reciever.user.id;
    this.selectedRoomId = reciever._id;
    if(reciever.user && reciever.user.name){
      this.userName = reciever.user.name;
    }
    if(this.selectedRoomId){
      this.requestService.getMessages(this.selectedRoomId, 1, 10).subscribe((data: any)=>{
        this.messages = data;
      })
    }
    else{
      this.messages = [];
    }
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
