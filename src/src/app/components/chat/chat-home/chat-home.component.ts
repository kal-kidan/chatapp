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
  messages: any = [];
  messageContent = new FormControl('');
  selectedUser: string = '';
  selectedUserMessage: any;
  @ViewChild('chatbox') chatContainer: ElementRef;
  constructor(private requestService: RequestService, private profileService: UserProfileService, private socket: SocketService, private userProfile: UserProfileService) {
    if(this.socket.getSocket()){
      this.socket.getSocket().on('message', (data)=>{
        this.messages.push(data);
      });
    }
   }
  ngOnInit(): void {
    this.socket.connect();
  }

  sendMessage(){
    const data = {senderId: this.userProfile.get().id, recieverId: this.selectedUser, message: this.messageContent.value, createdAt: Date.now(), updatedAt: Date.now()};
    this.socket.sendMessage(data);
    this.messages.push(data);
    this.messageContent.setValue('');
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

openMessages(selectedUserMessage: any){
  this.selectedUserMessage = selectedUserMessage;
}

}
