import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';  
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/auth/token.service';
import { UserProfileService } from 'src/app/services/auth/user-profile.service';
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
  constructor(private requestService: RequestService, private notification: NotificationService, private tokenService: TokenService, private router: Router, private profileService: UserProfileService ) {
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
    this.requestService.logIn(this.logInForm.value).subscribe((data: any)=>{ 
      this.tokenService.set(data.tokens.access.token);
      this.profileService.set(data.user.email, data.user.name, data.user.id);
      this.router.navigateByUrl("/chat");
    }) 
  }

  register(){
    if(this.registerForm.value.password!=this.registerForm.value.confirmPassword){
      return this.notification.showError("Passwords are not the same.");
    }
    this.requestService.register(this.registerForm.value).subscribe((data: any)=>{
      this.tokenService.set(data.token);
      this.router.navigateByUrl("/chat");
    }) 
  }

}
