import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { RequestService } from 'src/app/services/request.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { SocketService } from '../../../services/socket.service'
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
  email = new FormControl('');
  messageContent = new FormControl('');
  searchedUser: any = {};
  selectedUser: string = '';
  selectedRoomId: string = '';
  lastScrollTop = 0;
  currentMessagePage = 1;
  disableScrollDown = false;
  @ViewChild('chatbox') chatContainer: ElementRef;
  constructor(private requestService: RequestService, private profileService: UserProfileService, private socket: SocketService, private userProfile: UserProfileService) {
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

  ngAfterViewChecked(){
    this.scrollToBottom();
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

  sendMessage(){
    const data = {senderId: this.userProfile.get().id, recieverId: this.selectedUser, message: this.messageContent.value, createdAt: Date.now(), updatedAt: Date.now()};
    this.socket.sendMessage(data);
    this.messages.push(data);
    this.messageContent.setValue('');
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  onScroll(event: any) {
    let element = this.chatContainer.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    this.disableScrollDown = this.disableScrollDown && atBottom ? false: true;
    if (event.currentTarget.scrollTop <= 0) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollTop + 1;
      if(this.selectedRoomId){
        this.requestService.getMessages(this.selectedRoomId, this.currentMessagePage + 1, 10).subscribe((data: any)=>{
          if(data.length > 0) this.currentMessagePage++;
          this.messages =  data.concat(this.messages)
        })
      }
      else{
        this.messages = [];
      }
    }
  }

 scrollToBottom(): void {
    if (this.disableScrollDown) return
    try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {

    }
}

}
