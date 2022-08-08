import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 
import { NotificationService } from 'src/app/services/notification.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  logInForm: FormGroup;
  registerForm: FormGroup;
  constructor(private requestService: RequestService, private notification: NotificationService ) {
    this.logInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.registerForm = new FormGroup({
      email: new FormControl(),
      name: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
   }

  ngOnInit(): void {
  }

  logIn(){
    this.requestService.logIn(this.logInForm.value).subscribe((data)=>{
      alert("success")
    }) 
  }

  register(){
    if(this.registerForm.value.password!=this.registerForm.value.confirmPassword){
      return this.notification.showError("Passwords are not the same.");
    }
    this.requestService.register(this.registerForm.value).subscribe((data)=>{
      alert("success")
    }) 
  }

}
