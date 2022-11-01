import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
import { RequestService } from 'src/app/services/request.service';
import { SocketService } from 'src/app/services/socket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
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
  constructor(private requestService: RequestService, private socket: SocketService, private userProfile: UserProfileService) {
    if(this.socket.getSocket()){
      this.socket.getSocket().on('message', (data)=>{
        this.messages.push(data);
      });
    }
   }
  ngOnInit(): void {
    this.socket.connect();
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
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
