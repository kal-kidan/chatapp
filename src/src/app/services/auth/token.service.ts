import {Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  iss: any;
  constructor() { 
      this.iss = {
        login: 'chatapp',
        signup: 'chatapp',
      };   
  }

  set(token: string) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token')!;
  }

  isValid() {
    const helper = new JwtHelperService();
    const token = this.get();
    var valid = false;
    if (this.get()) {
      const payload = this.getPayLoad(token);
      const isExpired = helper.isTokenExpired(token);
      if (payload) { 
        valid = Object.values(this.iss).indexOf(payload.iss) > -1 && !isExpired ? true : false;
      }
    }
    if (!valid) {
      this.clear();
    }
    return valid;
  }
  clear() {
    localStorage.removeItem('token');  
  }
  getPayLoad(token: any) {
    var payload = token.split('.')[1];
    payload = JSON.parse(atob(payload));
    return payload;
  }

  loggedIn() {
    return this.isValid();
  }
}
