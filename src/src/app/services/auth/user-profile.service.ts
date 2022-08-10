import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  get() {
    return {
      id: localStorage.getItem('id'),
      email: localStorage.getItem('email'),
      photo: localStorage.getItem('name'), 
    };
  }

  set(email: string, name: string, id: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
    localStorage.setItem('name', name); 
  }
}
